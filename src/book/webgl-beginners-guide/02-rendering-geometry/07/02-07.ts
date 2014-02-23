import { getShader, initGL, requestJSON } from '../../00/00.js';

declare const mat4: any;

let model: { color: [number, number, number]; vertices: Array<number>; indices: Array<number> };
let vertexArray: Array<number>;
let indexArray: Array<number>;
let prg: WebGLProgram | null;
let VBO: WebGLBuffer | null;
let IBO: WebGLBuffer | null;
const mvMatrix: Float32List = mat4.create();
const pMatrix: Float32List = mat4.create();

initGL().then((gl: WebGLRenderingContext) => {
  initProgram(gl);
  initBuffers(gl).then(() => {
    render(gl);
  });
});

/**
 *
 * @param gl
 */
function initProgram(gl: WebGLRenderingContext): void {
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
    // @ts-ignore
    prg.modelColor = gl.getUniformLocation(prg, 'modelColor');
  } else {
    throw new Error('COULD NOT INITIALISE SHADERS');
  }
}

/**
 *
 * @param gl
 */
function initBuffers(gl: WebGLRenderingContext): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    initModel().then(() => {
      VBO = gl.createBuffer();
      if (!VBO) {
        throw new Error('VBO IS NULL');
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);

      IBO = gl.createBuffer();
      if (!IBO) {
        throw new Error('IBO IS NULL');
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

      // @ts-ignore
      gl.uniform3f(prg.modelColor, ...model.color);
      resolve();
    });
  });
}

/**
 *
 * @param gl
 */
function render(gl: WebGLRenderingContext) {
  // @ts-ignore
  window.requestAnimationFrame(render.bind(this, gl));
  drawScene(gl);
}

/**
 *
 * @param gl
 */
function drawScene(gl: WebGLRenderingContext) {
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

function initModel(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    requestJSON('http://localhost:3003/api/doc/book/webgl-beginners-guide/02-07').then((data: object) => {
      model = data as typeof model;
      vertexArray = model.vertices;
      indexArray = model.indices;
      resolve();
    });
  });
}
