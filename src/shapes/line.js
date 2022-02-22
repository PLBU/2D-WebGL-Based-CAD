class Line {
  constructor(vertices, colors) {
    this.vertices = vertices;
    this.colors = colors;
  }

  render(webGL, shader) {
    const lineBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(this.vertices)
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, lineBuffer);
    enableAttrShader(webGL, shader, "vertexPos", 2);
  
    const colorBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(this.colors)
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 4);
  
    webGL.drawArrays(webGL.LINES, 0, 2);
    webGL.drawArrays(webGL.LINES, 2, 2);
  }
}