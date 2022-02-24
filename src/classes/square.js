class Square {
  /**
   * Create a Square Object
   * @param {Array<Vertex>[2]} vertices
   * @param {Color} color
   * @param {Number} ratio
   */
  constructor(vertices, color, ratio) {
    const x1 = vertices[0].x;
    const y1 = vertices[0].y;
    let x2 = vertices[1].x;
    let y2 = vertices[1].y;

    const shortestDistXY =
      Math.abs(x1 - x2) < Math.abs(y1 - y2)
        ? Math.abs(x1 - x2)
        : Math.abs(y1 - y2);

    x2 = x1 > x2 ? x1 - shortestDistXY : x1 + shortestDistXY;
    y2 = y1 > y2 ? y1 - shortestDistXY : y1 + shortestDistXY;

    const x3 = x1;
    const y3 = y2;

    const x4 = x2;
    const y4 = y1;

    const v1 = new Vertex(x1, y1 * ratio);
    const v2 = new Vertex(x2, y2 * ratio);
    const v3 = new Vertex(x3, y3 * ratio);
    const v4 = new Vertex(x4, y4 * ratio);

    this.vertices = [v1, v3, v4, v2, v3, v4];
    this.color = color;
  }

  /**
   * Render the Square Object
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
      new Float32Array(this.color)
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 3);

    webGL.drawArrays(webGL.TRIANGLES, 0, 6);
  }

  // /**
  //  * Change the position of the Line's index-th dot
  //  * @param {number} index
  //  * @param {number} x
  //  * @param {number} y
  //  */
  // changeDotPosByIndex(index, x, y) {
  //   this.vertices[index].changePos(x, y);
  // }
}
