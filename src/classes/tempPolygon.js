class TempPolygon {
  /**
   * Create a Temporary Polygon Object
   * @param {Array<Vertex>} vertices
   * @param {Array<Color>} colors
   */
  constructor(vertices, colors) {
    this.vertices = vertices;
    this.colors = colors;
  }

  /**
   * Render the Polygon Object
   * @param {WebGLRenderingContextBase} webGL
   */
  render(webGL, shader) {
    const rectBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(Vertex.flattenVertices(this.vertices))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, rectBuffer);
    enableAttrShader(webGL, shader, "vertexPos", 2);

    const colorBuffer = initBuffer(
      webGL,
      webGL.ARRAY_BUFFER,
      new Float32Array(Color.flattenColors(this.colors))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 4);

    webGL.drawArrays(webGL.TRIANGLE_FAN, 0, this.vertices.length);
  }
}
