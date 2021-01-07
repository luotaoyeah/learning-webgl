import { getShader, initGL } from '../../00/00.js';
let mode = 'TRIANGLES';
initGL().then((gl) => {
  const selectEl = document.querySelector('#select01');
  if (selectEl) {
    selectEl.addEventListener('change', (event) => {
      mode = event.target.value;
    });
  }
  const prg = initProgram(gl);
  const [, indexArray, VBO, IBO] = initBuffers(gl);
  render(gl, prg, indexArray, VBO, IBO);
});
/**
 *
 * @param gl
 */
function initProgram(gl) {
  let vertexShader = getShader(gl, 'shader-vs');
  let fragmentShader = getShader(gl, 'shader-fs');
  const prg = gl.createProgram();
  if (prg && fragmentShader && vertexShader) {
    gl.attachShader(prg, vertexShader);
    gl.attachShader(prg, fragmentShader);
    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      throw new Error('COULD NOT INITIALISE SHADERS');
    }
    gl.useProgram(prg);
    // @ts-ignore
    prg.aVertexPosition = gl.getAttribLocation(prg, 'aVertexPosition');
  } else {
    throw new Error('COULD NOT INITIALISE SHADERS');
  }
  return prg;
}
/**
 *
 * @param gl
 */
function initBuffers(gl) {
  const vertexArray = [...[-0.5, -0.5, 0.0], ...[-0.25, 0.5, 0.0], ...[0.0, -0.5, 0.0], ...[0.25, 0.5, 0.0], ...[0.5, -0.5, 0.0]];
  const VBO = gl.createBuffer();
  if (!VBO) {
    throw new Error('VBO IS NULL');
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  const indexArray = [0, 1, 2, 0, 2, 3, 2, 3, 4];
  const IBO = gl.createBuffer();
  if (!IBO) {
    throw new Error('IBO IS NULL');
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  return [vertexArray, indexArray, VBO, IBO];
}
/**
 *
 * @param gl
 * @param prg
 * @param indexArray
 * @param VBO
 * @param IBO
 */
function render(gl, prg, indexArray, VBO, IBO) {
  // @ts-ignore
  window.requestAnimationFrame(render.bind(this, gl, prg, indexArray, VBO, IBO));
  drawScene(gl, prg, indexArray, VBO, IBO);
}
/**
 *
 * @param gl
 * @param prg
 * @param indexArray
 * @param VBO
 * @param IBO
 */
function drawScene(gl, prg, indexArray, VBO, IBO) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, 1280, 720);
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  // @ts-ignore
  gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  // @ts-ignore
  gl.enableVertexAttribArray(prg.vertexPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  /*
   * WebGLRenderingContextBase.drawElements() 方法的第一个参数表示渲染模式,
   * 不同的渲染模式, 使用的 index array 数据是不一样的
   */
  switch (mode) {
    /*
     * WebGLRenderingContextBase.TRIANGLES
     * 每 3 个点为一组, 每一组是一个三角形
     */
    case 'TRIANGLES': {
      indexArray = [...[0, 1, 2], ...[2, 3, 4]];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.LINES
     * 每 2 个点为一组, 每一组是一条线
     */
    case 'LINES': {
      indexArray = [...[1, 3], ...[0, 4], ...[1, 2], ...[2, 3]];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.LINES, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.POINTS
     * 每 1 个点为一组, 每一组为一个点
     */
    case 'POINTS': {
      indexArray = [1, 2, 3];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.POINTS, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.LINE_LOOP
     * 每 1 个点为一组, 所有的点依次连接, 成为一个闭环
     */
    case 'LINE_LOOP': {
      indexArray = [2, 3, 4, 1, 0];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.LINE_LOOP, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.LINE_STRIP
     * 跟 WebGLRenderingContextBase.LINE_LOOP 类似, 区别在于不会成为闭环, 即最后一个点不会连接第一个点
     */
    case 'LINE_STRIP': {
      indexArray = [2, 3, 4, 1, 0];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.LINE_STRIP, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.TRIANGLE_STRIP
     * 每 3 个点为一组, 每一组是一个三角形,
     * 跟 WebGLRenderingContextBase.TRIANGLES 的区别在于, 分组形式不一样,
     * 如下的 [0, 1, 2, 3, 4] 会分组为 (0,1,2), (1,2,3), (2,3,4) 共 3 组
     */
    case 'TRIANGLE_STRIP': {
      indexArray = [0, 1, 2, 3, 4];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.TRIANGLE_STRIP, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
    /*
     * WebGLRenderingContextBase.TRIANGLE_FAN
     * 每 3 个点为一组, 每一组是一个三角形,
     * 跟 WebGLRenderingContextBase.TRIANGLE_STRIP 的区别在于, 分组形式不一样,
     * 如下的 [0, 1, 2, 3, 4] 会分组为 (0,1,2), (0,3,4) 共 2 组
     */
    case 'TRIANGLE_FAN': {
      indexArray = [0, 1, 2, 3, 4];
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
      gl.drawElements(gl.TRIANGLE_FAN, indexArray.length, gl.UNSIGNED_SHORT, 0);
      break;
    }
  }
}
//# sourceMappingURL=02-05.js.map
