class Polygon {

    /**
   * Create a Polygon Object
   * @param {Number} numOfSides
   * @param {Array<Vertex>[2]} vertices
   * @param {Color} color
   */
  constructor(numOfSides, vertices, color) {
    if (numOfSides == 3) { // triangle
        const v1 = vertices[0];
        const v2 = vertices[1];

        const x1 = v1.x;
        const y1 = v2.y;
        
        const x2 = v2.x;
        const y2 = v2.y;

        const x3 = (x1 + x2) / 2;
        const y3 = v1.y;

        const v3 = new Vertex(x3, y3);

        this.vertices = [v1, v2, v3];
    } else if (numOfSides == 4) { // rectangle
        const v1 = vertices[0];
        const v2 = vertices[1];
    
        const x1 = v1.x;
        const y1 = v1.y;
    
        const x2 = v2.x;
        const y2 = v2.y;
    
        const x3 = x1;
        const y3 = y2;
    
        const x4 = x2;
        const y4 = y1;
    
        const v3 = new Vertex(x3, y3);
        const v4 = new Vertex(x4, y4);
    
        this.vertices = [v1, v3, v4, v2, v3, v4];
    } else if (numOfSides == 5) {
      // pentagon
    } else if (numOfSides == 6) {
      // hexagon
    } // itu aja dulu(?)

    this.color = color;
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
      new Float32Array(this.color)
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 3);

    if (this.numOfSides == 3) {
      webGL.drawArrays(webGL.TRIANGLES, 0, 3);
    } else if (this.numOfSides == 4) {
      webGL.drawArrays(webGL.TRIANGLES, 0, 6);
    } else if (this.numOfSides == 5) {
      webGL.drawArrays(webGL.TRIANGLES, 0, 9);
    } else if (this.numOfSides == 6) {
      webGL.drawArrays(webGL.TRIANGLES, 0, 12);
    }
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