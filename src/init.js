const initCanvas = (webGL, canvas) => {
  webGL.viewport(0, 0, canvas.width, canvas.height);
  webGL.clearColor(0.9, 0.9, 0.9, 1.0);
  webGL.clear(webGL.COLOR_BUFFER_BIT);
};

const initBuffer = (webGL, target, dataToStore) => {
  var buffer = webGL.createBuffer();

  webGL.bindBuffer(target, buffer);
  webGL.bufferData(target, dataToStore, webGL.STATIC_DRAW);

  return buffer;
};

const initShader = (webGL) => {
  // Vertex shader code
  const vertexCode = `attribute vec4 vertexPos;
    attribute vec4 vertexColor;
    varying vec4 fragColor;
    void main(void) {
      gl_Position = vertexPos;
      fragColor = vertexColor;
  }`;

  // Fragment shader code
  const fragmentShaderCode = `precision mediump float;
    varying vec4 fragColor;
    void main(void) {
      gl_FragColor = fragColor;
  }`;

  var vertShader = loadShader(webGL, webGL.VERTEX_SHADER, vertexCode);
  var fragShader = loadShader(webGL, webGL.FRAGMENT_SHADER, fragmentShaderCode);
  var shaderProgram = webGL.createProgram();

  webGL.attachShader(shaderProgram, vertShader);
  webGL.attachShader(shaderProgram, fragShader);
  webGL.linkProgram(shaderProgram);
  webGL.useProgram(shaderProgram);

  return shaderProgram;
};

const loadShader = (webGL, shaderType, code) => {
  var shader = webGL.createShader(shaderType);

  webGL.shaderSource(shader, code);
  webGL.compileShader(shader);

  return shader;
};

const enableAttrShader = (webGL, shaderProgram, attrName, size) => {
  const attrLoc = webGL.getAttribLocation(shaderProgram, attrName);

  webGL.vertexAttribPointer(attrLoc, size, webGL.FLOAT, false, 0, 0);
  webGL.enableVertexAttribArray(attrLoc);
}