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

    this.ratio = ratio;
    const offset = y1 * (ratio - 1);

    this.v1 = new Vertex(x1, y1 * ratio - offset);
    this.v2 = new Vertex(x2, y2 * ratio - offset);
    this.v3 = new Vertex(x3, y3 * ratio - offset);
    this.v4 = new Vertex(x4, y4 * ratio - offset);

    this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
    this.color = [color, color, color, color, color, color];
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
      new Float32Array(Color.flattenColors(this.color))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 4);

    webGL.drawArrays(webGL.TRIANGLES, 0, 6);
  }

  /**
   * Change and resize the position of the Square's corresponding corner
   * @param {Vertex} oldVertex the closest vertex that is clicked
   * @param {Vertex} newVertex the new vertex created on mouse click
   */
  changeVertexPos(oldVertex, newVertex) {
    // Move v1
    if (oldVertex.isEqual(this.v1)) {
      let x1 = newVertex.x;
      let y1 = newVertex.y;
      const x2 = this.v2.x;
      const y2 = this.v2.y;

      const shortestDistXY =
        Math.abs(x1 - x2) < Math.abs(y1 - y2)
          ? Math.abs(x1 - x2)
          : Math.abs(y1 - y2);

      x1 = x1 < x2 ? x2 - shortestDistXY : x2 + shortestDistXY;
      y1 = y1 < y2 ? y2 - shortestDistXY : y2 + shortestDistXY;

      const x3 = x1;
      const y3 = y2;

      const x4 = x2;
      const y4 = y1;

      const offset = y2 * (this.ratio - 1);

      this.v1 = new Vertex(x1, y1 * this.ratio - offset);
      this.v2 = new Vertex(x2, y2 * this.ratio - offset);
      this.v3 = new Vertex(x3, y3 * this.ratio - offset);
      this.v4 = new Vertex(x4, y4 * this.ratio - offset);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v2
    if (oldVertex.isEqual(this.v2)) {
      const x1 = this.v1.x;
      const y1 = this.v1.y;
      let x2 = newVertex.x;
      let y2 = newVertex.y;

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

      const offset = y1 * (this.ratio - 1);

      this.v1 = new Vertex(x1, y1 * this.ratio - offset);
      this.v2 = new Vertex(x2, y2 * this.ratio - offset);
      this.v3 = new Vertex(x3, y3 * this.ratio - offset);
      this.v4 = new Vertex(x4, y4 * this.ratio - offset);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v3
    if (oldVertex.isEqual(this.v3)) {
      let x3 = newVertex.x;
      let y3 = newVertex.y;
      const x4 = this.v4.x;
      const y4 = this.v4.y;

      const shortestDistXY =
        Math.abs(x3 - x4) < Math.abs(y3 - y4)
          ? Math.abs(x3 - x4)
          : Math.abs(y3 - y4);

      x3 = x3 < x4 ? x4 - shortestDistXY : x4 + shortestDistXY;
      y3 = y3 < y4 ? y4 - shortestDistXY : y4 + shortestDistXY;

      const x1 = x3;
      const y1 = y4;

      const x2 = x4;
      const y2 = y3;

      const offset = y4 * (this.ratio - 1);

      this.v1 = new Vertex(x1, y1 * this.ratio - offset);
      this.v2 = new Vertex(x2, y2 * this.ratio - offset);
      this.v3 = new Vertex(x3, y3 * this.ratio - offset);
      this.v4 = new Vertex(x4, y4 * this.ratio - offset);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v4
    if (oldVertex.isEqual(this.v4)) {
      const x3 = this.v3.x;
      const y3 = this.v3.y;
      let x4 = newVertex.x;
      let y4 = newVertex.y;

      const shortestDistXY =
        Math.abs(x3 - x4) < Math.abs(y3 - y4)
          ? Math.abs(x3 - x4)
          : Math.abs(y3 - y4);

      x4 = x3 > x4 ? x3 - shortestDistXY : x3 + shortestDistXY;
      y4 = y3 > y4 ? y3 - shortestDistXY : y3 + shortestDistXY;

      const x1 = x3;
      const y1 = y4;

      const x2 = x4;
      const y2 = y3;

      const offset = y3 * (this.ratio - 1);

      this.v1 = new Vertex(x1, y1 * this.ratio - offset);
      this.v2 = new Vertex(x2, y2 * this.ratio - offset);
      this.v3 = new Vertex(x3, y3 * this.ratio - offset);
      this.v4 = new Vertex(x4, y4 * this.ratio - offset);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }
  }

  /**
   * Change the color of the Rectangle
   * @param {Color} color
   */
  changeColor(color) {
    this.color = [color, color, color, color, color, color];
  }
}
