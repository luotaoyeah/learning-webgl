import { getShader, initGL } from '../../00/00.js';
initGL().then((gl) => {
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
    }
    else {
        throw new Error('COULD NOT INITIALISE SHADERS');
    }
    return prg;
}
/**
 *
 * @param gl
 */
function initBuffers(gl) {
    /*
     * 构造 VBO/IBO 的步骤如下:
     */
    /*
     * 1. 构造 vertex 数据的数组
     * 对于顶点(vertex)来说, 每 3 个元素一组, 分别表示一个顶点的 x/y/z 坐标, 每一组都有一个索引(index), 从 0 开始
     */
    const vertexArray = [...[-0.5, 0.5, 0.0], ...[-0.5, -0.5, 0.0], ...[0.5, -0.5, 0.0], ...[0.5, 0.5, 0.0]];
    /* 2. 使用 WebGLRenderingContextBase.createBuffer() 方法, 创建一个 buffer 对象 */
    const VBO = gl.createBuffer();
    if (!VBO) {
        throw new Error('VBO IS NULL');
    }
    /* 3. 使用 WebGLRenderingContextBase.bindBuffer() 方法, 绑定 current buffer */
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    /* 4. 使用 WebGLRenderingContextBase.bufferData() 方法, 设置 buffer 数据 */
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);
    /* 5. 使用 WebGLRenderingContextBase.bindBuffer() 方法, 解绑 current buffer, 传递的参数为 null */
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*
     * 对于 index 来说, 每 3 个元素一组, 组成一个三角形的三个顶点
     */
    const indexArray = [...[3, 2, 1], ...[3, 1, 0]];
    const IBO = gl.createBuffer();
    if (!IBO) {
        throw new Error('IBO IS NULL');
    }
    /*
     * 对于 WebGLRenderingContextBase.bindBuffer() 和 WebGLRenderingContextBase.bufferData() 方法,
     * 对于 vertex 来说, 第一个参数为 WebGLRenderingContextBase.ARRAY_BUFFER
     * 对于 index 来说, 第一个参数为 WebGLRenderingContextBase.ELEMENT_ARRAY_BUFFER
     */
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
    /*
     * vertex shader 上面有很多的 attribute, 每一个 attribute 都需要指向一个 VBO, 操作步骤如下:
     */
    /* 1. 绑定 current VBO */
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    /*
     *  2. 使用 WebGLRenderingContextBase.vertexAttribPointer() 方法, 将某个 attribute 只想 current VBO
     *     其中,
     *       第一个参数表示, 要设置哪一个 attribute
     *       第二个参数表示, 这个 VBO 中每一组数据包含几个值
     *       第三个参数表示, 这个 VBO 中的元素的类型
     */
    // @ts-ignore
    gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    /*
     * 3. 使用 WebGLRenderingContextBase.enableVertexAttribArray() 方法, 其中这个 attribute
     */
    // @ts-ignore
    gl.enableVertexAttribArray(prg.aVertexPosition);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
}
//# sourceMappingURL=02-03.js.map