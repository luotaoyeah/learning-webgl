/**
 * init WebGL context
 */
export function init(): Promise<WebGLRenderingContext> {
  return new Promise<WebGLRenderingContext>((resolve, reject) => {
    window.addEventListener("load", function() {
      const canvasEl = document.querySelector<HTMLCanvasElement>("#canvas01");
      if (canvasEl) {
        const gl = canvasEl.getContext("webgl");
        if (gl) {
          resolve(gl);
        } else {
          reject(new Error("WEBGL NOT SUPPORTED"));
        }
      } else {
        reject(new Error("CANVAS NOT EXIST"));
      }
    });
  });
}
