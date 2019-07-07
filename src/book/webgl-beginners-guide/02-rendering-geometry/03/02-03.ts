import { init } from "../../00/00.js";

init().then((gl: WebGLRenderingContext) => {
  const vertexArray = getVertexArray();
  const indexArray = getIndexArray();
});

function getVertexArray(): Array<number> {
  return [
    1.5,
    0,
    0,
    -1.5,
    1,
    0,
    -1.5,
    0.809017,
    0.587785,
    -1.5,
    0.309017,
    0.951057,
    -1.5,
    -0.309017,
    0.951057,
    -1.5,
    -0.809017,
    0.587785,
    -1.5,
    -1,
    0,
    -1.5,
    -0.809017,
    -0.587785,
    -1.5,
    -0.309017,
    -0.951057,
    -1.5,
    0.309017,
    -0.951057,
    -1.5,
    0.809017,
    -0.587785,
  ];
}

function getIndexArray(): Array<number> {
  return [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 7, 0, 7, 8, 0, 8, 9, 0, 9, 10, 0, 10, 1];
}
