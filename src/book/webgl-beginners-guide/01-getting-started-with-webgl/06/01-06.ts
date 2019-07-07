window.addEventListener("load", function() {
  const canvasEl = document.querySelector<HTMLCanvasElement>("#canvas01");
  if (canvasEl) {
    /*
     * 使用 HTMLCanvasElement.getContext() 方法, 获取 WebGL 的上下文对象,
     * 传入的参数为 "webgl"
     */
    const gl = canvasEl.getContext("webgl");
    if (gl) {
      console.log("gl instanceof WebGLRenderingContext", gl instanceof WebGLRenderingContext);
    }
  }
});
