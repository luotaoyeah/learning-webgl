import { getShader, initGL } from "../../00/00.js";

initGL().then((gl: WebGLRenderingContext) => {
  initProgram(gl);

  /*
   * 构造 VBO/IBO 的步骤如下:
   *
   * 1. 构造 vertex 数据的数组
   */
  const vertexArray = getVertexArray();
  /* 2. 使用 WebGLRenderingContextBase.createBuffer() 方法, 创建一个 buffer 对象 */
  const VBO = gl.createBuffer();
  /* 3. 使用 WebGLRenderingContextBase.bindBuffer() 方法, 绑定 current buffer */
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
  /* 4. 使用 WebGLRenderingContextBase.bufferData() 方法, 设置 buffer 数据 */
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
  /* 5. 使用 WebGLRenderingContextBase.bindBuffer() 方法, 解绑 current buffer, 传递的参数为 null */
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const indexArray = getIndexArray();
  const IBO = gl.createBuffer();
  /*
   * 对于 WebGLRenderingContextBase.bindBuffer() 和 WebGLRenderingContextBase.bufferData() 方法,
   * 对于 vertex 来说, 第一个参数为 WebGLRenderingContextBase.ARRAY_BUFFER
   * 对于 index 来说, 第一个参数为 WebGLRenderingContextBase.ELEMENT_ARRAY_BUFFER
   */
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
});

/*
 * 对于顶点(vertex)来说, 每 3 个元素一组, 分别表示一个顶点的 x/y/z 坐标, 每一组都有一个索引(index), 从 0 开始
 */
function getVertexArray(): Array<number> {
  return [
    ...[1.5, 0, 0],
    ...[-1.5, 1, 0],
    ...[-1.5, 0.809017, 0.587785],
    ...[-1.5, 0.309017, 0.951057],
    ...[-1.5, -0.309017, 0.951057],
    ...[-1.5, -0.809017, 0.587785],
    ...[-1.5, -1, 0],
    ...[-1.5, -0.809017, -0.587785],
    ...[-1.5, -0.309017, -0.951057],
    ...[-1.5, 0.309017, -0.951057],
    ...[-1.5, 0.809017, -0.587785],
  ];
}

/*
 * 对于 index 来说, 每 3 个元素一组, 组成一个三角形的三个顶点
 */
function getIndexArray(): Array<number> {
  return [
    ...[0, 1, 2],
    ...[0, 2, 3],
    ...[0, 3, 4],
    ...[0, 4, 5],
    ...[0, 5, 6],
    ...[0, 6, 7],
    ...[0, 7, 8],
    ...[0, 8, 9],
    ...[0, 9, 10],
    ...[0, 10, 1],
  ];
}

function initProgram(gl: WebGLRenderingContext) {
  let vertexShader = getShader(gl, "shader-vs");
  let fragmentShader = getShader(gl, "shader-fs");

  const program: WebGLProgram | null = gl.createProgram();

  if (program && fragmentShader && vertexShader) {
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("COULD NOT INITIALISE SHADERS");
    }

    gl.useProgram(program);

    // @ts-ignore
    program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
  }
}
