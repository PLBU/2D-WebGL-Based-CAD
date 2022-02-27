class Line {
  /**
   * Create a Line Object
   * @param {Array<Vertex>[2]} vertices
   * @param {Color} color
   */
  constructor(vertices, color) {
    this.vertices = vertices;
    this.colors = [color, color];
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
  }

  /**
   * Change the position of the Line's index-th dot
   * @param {Vertex} oldVertex
   * @param {Vertex} newVertex
   */
  changeVertexPos(oldVertex, newVertex) {
    for (var i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].isEqual(oldVertex)) {
        this.vertices[i].changePos(newVertex.x, newVertex.y);
      }
    }
  }

  /**
   * Change the color of the Line
   * @param {Color} color
   */
  changeColor(color) {
    this.colors = [color, color];
  }
}
