import { getShader, initGL } from '../../00/00.js';
let vertexArray;
let indexArray;
let prg;
let VBO;
let IBO;
const mvMatrix = mat4.create();
const pMatrix = mat4.create();
initGL().then((gl) => {
  initProgram(gl);
  initBuffers(gl);
  render(gl);
});
/**
 *
 * @param gl
 */
function initProgram(gl) {
  let vertexShader = getShader(gl, 'shader-vs');
  let fragmentShader = getShader(gl, 'shader-fs');
  prg = gl.createProgram();
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
    // @ts-ignore
    prg.pMatrixUniform = gl.getUniformLocation(prg, 'uPMatrix');
    // @ts-ignore
    prg.mvMatrixUniform = gl.getUniformLocation(prg, 'uMVMatrix');
  } else {
    throw new Error('COULD NOT INITIALISE SHADERS');
  }
}
/**
 *
 * @param gl
 */
function initBuffers(gl) {
  vertexArray = [
    1.5, 0, 0, -1.5, 1, 0, -1.5, 0.809017, 0.587785, -1.5, 0.309017, 0.951057, -1.5, -0.309017, 0.951057, -1.5, -0.809017, 0.587785, -1.5, -1, -4.10207e-10,
    -1.5, -0.809017, -0.587785, -1.5, -0.309017, -0.951057, -1.5, 0.309017, -0.951057, -1.5, 0.809017, -0.587785,
  ];
  VBO = gl.createBuffer();
  if (!VBO) {
    throw new Error('VBO IS NULL');
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
  indexArray = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 9, 0, 9, 10, 0, 10, 1];
  IBO = gl.createBuffer();
  if (!IBO) {
    throw new Error('IBO IS NULL');
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
  /*
   * 使用 gl.getParameter(gl.ARRAY_BUFFER_BINDING) 获取当前绑定的 VBO
   */
  const currentVBO = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
  console.assert(currentVBO === VBO);
  console.log('gl.getParameter(gl.ARRAY_BUFFER_BINDING)\n', currentVBO);
  /*
   * 使用 WebGLRenderingContextBase.getBufferParameter() 方法, 获取当前的 VBO/IBO 的信息,
   * 可以获取的信息包括 WebGLRenderingContextBase.BUFFER_SIZE 和 WebGLRenderingContextBase.BUFFER_USAGE,
   * 其中 BUFFER_SIZE 表示字节长度,
   * 其中 BUFFER_USAGE 表示使用方式, 可能的值为 gl.STATIC_DRAW/gl.DYNAMIC_DRAW/gl.STREAM_DRAW
   */
  const vboSize = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE);
  console.log('gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE)\n', vboSize);
  /*
   * 使用 gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING) 获取当前绑定的 IBO
   */
  const currentIBO = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
  console.assert(currentIBO === IBO);
  console.log('gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING)\n', currentIBO);
  const iboUsage = gl.getBufferParameter(gl.ELEMENT_ARRAY_BUFFER, gl.BUFFER_USAGE);
  console.log('gl.getBufferParameter(gl.ELEMENT_ARRAY_BUFFER, gl.BUFFER_USAGE)\n', iboUsage);
  /*
   * 使用 WebGLRenderingContextBase.isBuffer() 方法, 判断某个对象是否是一个 WebGLBuffer 对象
   */
  console.assert(gl.isBuffer(IBO));
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}
/**
 *
 * @param gl
 */
function render(gl) {
  // @ts-ignore
  window.requestAnimationFrame(render.bind(this, gl));
  drawScene(gl);
}
/**
 *
 * @param gl
 */
function drawScene(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, 1280, 720);
  mat4.perspective(45, 1280 / 720, 0.1, 10000.0, pMatrix);
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);
  // @ts-ignore
  gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
  // @ts-ignore
  gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  // @ts-ignore
  gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  // @ts-ignore
  gl.enableVertexAttribArray(prg.aVertexPosition);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  gl.drawElements(gl.LINE_LOOP, indexArray.length, gl.UNSIGNED_SHORT, 0);
}
//# sourceMappingURL=02-06.js.map
