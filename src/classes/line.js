class Line {
  /**
   * Create a Line Object
   * @param {Array<Vertex>[2]} vertices
   * @param {Array<Color>[2]} colors
   */
  constructor(vertices, colors) {
    this.vertices = vertices;
    this.colors = colors;
  }

  /**
   * Render the Line Object
   * @param {WebGLRenderingContextBase} webGL
   */
  render(webGL, shader) {
    const lineBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(Vertex.flattenVertices(this.vertices))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, lineBuffer);
    enableAttrShader(webGL, shader, "vertexPos", 2);

    const colorBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(Color.flattenColors(this.colors))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 4);

    webGL.drawArrays(webGL.LINES, 0, 2);
    webGL.drawArrays(webGL.LINES, 2, 2);
  }

  /**
   * Change the position of the Line's index-th dot
   * @param {number} index
   * @param {number} x
   * @param {number} y
   */
  changeDotPosByIndex(index, x, y) {
    this.vertices[index].changePos(x, y);
  }
}
