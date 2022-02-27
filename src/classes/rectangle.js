class Rectangle {
  /**
   * Create a Rectangle Object
   * @param {Array<Vertex>[2]} vertices
   * @param {Color} color
   */
  constructor(vertices, color) {
    this.v1 = vertices[0];
    this.v2 = vertices[1];

    const x1 = v1.x;
    const y1 = v1.y;

    const x2 = v2.x;
    const y2 = v2.y;

    const x3 = x1;
    const y3 = y2;

    const x4 = x2;
    const y4 = y1;

    this.v3 = new Vertex(x3, y3);
    this.v4 = new Vertex(x4, y4);

    this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
    this.color = [color, color, color, color, color, color];
  }

  /**
   * Render the Rectangle Object
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
   * Change and resize the position of the Recangle's corresponding corner
   * @param {Vertex} vtx the closest vertex that is clicked
   * @param {number} x
   * @param {number} y
   */
  changeDotPosByVertex(vtx, x, y) {
    // Move v1
    if (vtx.isEqual(this.v1)) {
      const x1 = x;
      const y1 = y;

      const x2 = this.v2.x;
      const y2 = this.v2.y;

      const x3 = x1;
      const y3 = y2;

      const x4 = x2;
      const y4 = y1;

      this.v1 = new Vertex(x1, y1);
      this.v3 = new Vertex(x3, y3);
      this.v4 = new Vertex(x4, y4);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v2
    if (vtx.isEqual(this.v2)) {
      const x1 = this.v1.x;
      const y1 = this.v1.y;

      const x2 = x;
      const y2 = y;

      const x3 = x1;
      const y3 = y2;

      const x4 = x2;
      const y4 = y1;

      this.v2 = new Vertex(x2, y2);
      this.v3 = new Vertex(x3, y3);
      this.v4 = new Vertex(x4, y4);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v3
    if (vtx.isEqual(this.v3)) {
      const x3 = x;
      const y3 = y;

      const x4 = this.v4.x;
      const y4 = this.v4.y;

      const x1 = x3;
      const y1 = y4;

      const x2 = x4;
      const y2 = y3;

      this.v1 = new Vertex(x1, y1);
      this.v2 = new Vertex(x2, y2);
      this.v3 = new Vertex(x3, y3);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }

    // Move v4
    if (vtx.isEqual(this.v4)) {
      const x3 = this.v3.x;
      const y3 = this.v3.y;

      const x4 = x;
      const y4 = y;

      const x1 = x3;
      const y1 = y4;

      const x2 = x4;
      const y2 = y3;

      this.v1 = new Vertex(x1, y1);
      this.v2 = new Vertex(x2, y2);
      this.v4 = new Vertex(x4, y4);

      this.vertices = [this.v1, this.v3, this.v4, this.v2, this.v3, this.v4];
      return;
    }
  }
}
