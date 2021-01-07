/**
 * init WebGL context
 */
function initGL() {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', function () {
            const canvasEl = document.querySelector('#canvas01');
            if (canvasEl) {
                const gl = canvasEl.getContext('webgl');
                if (gl) {
                    resolve(gl);
                }
                else {
                    reject(new Error('WEBGL NOT SUPPORTED'));
                }
            }
            else {
                reject(new Error('CANVAS NOT EXIST'));
            }
        });
    });
}
/**
 * get WebGLShader
 * @param gl
 * @param id
 */
function getShader(gl, id) {
    const script = document.querySelector(`#${id}`);
    if (!script) {
        return null;
    }
    let str = '';
    let k = script.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }
    let shader;
    if (script.type == 'x-shader/x-fragment') {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (script.type == 'x-shader/x-vertex') {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else {
        return null;
    }
    if (shader) {
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader) || '');
        }
    }
    return shader;
}
/**
 * get json data
 * @param url URL
 */
function requestJSON(url) {
    return new Promise((resolve, reject) => {
        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', url);
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState === 4) {
                if (xmlHttpRequest.status === 200) {
                    resolve(JSON.parse(xmlHttpRequest.responseText));
                }
            }
        };
        xmlHttpRequest.send();
    });
}
export { initGL, getShader, requestJSON };
//# sourceMappingURL=00.js.map