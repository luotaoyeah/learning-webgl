import { initGL } from '../../00/00.js';

initGL().then((gl: WebGLRenderingContext) => {
  /*
   * WebGL 是一个状态机(state machine), 什么意思呢?
   * 就是说, context 对象上有很多表示状态的属性, 这些属性可以被赋值和取值,
   * 一旦被赋值之后, 这个属性所表示的状态就不会再改变了, 直到下一次被赋值
   */
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    switch (event.key) {
      case '1':
        /*
         * 通过 WebGLRenderingContextBase.clearColor() 方法, 设置 clear color 的值
         */
        gl.clearColor(0.3, 0.7, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, 1280, 720);
        break;
      case '2':
        gl.clearColor(0.3, 0.2, 0.7, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, 1280, 720);
        break;
      case '3':
        /*
         * 通过 WebGLRenderingContextBase.getParameter() 方法, 获取某个属性的值
         */
        let color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
        console.log(color);
        break;
      default:
        break;
    }
  });
});
