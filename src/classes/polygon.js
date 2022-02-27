class Polygon {
    /**
   * Create a Polygon Object
   * @param {Number} numOfSides
   * @param {Array<Vertex>[2]} vertices
   * @param {Color} color
   */
  constructor(numOfSides, vertices, color) {
    const vi = vertices[0];
    const vj = vertices[1];

    if (numOfSides === 3) { // triangle
        const x1 = vi.x;
        const y1 = vj.y;
        
        const x2 = vj.x;
        const y2 = vj.y;

        const x3 = (x1 + x2) / 2;
        const y3 = vi.y;

        const v1 = new Vertex(x1, y1);
        const v2 = new Vertex(x2, y2);
        const v3 = new Vertex(x3, y3);
        
        this.vertices = [v1, v2, v3];
    } else if (numOfSides === 4) { // rectangle
        const x1 = vi.x;
        const y1 = vi.y;
    
        const x2 = vj.x;
        const y2 = vj.y;
    
        const x3 = x1;
        const y3 = y2;
    
        const x4 = x2;
        const y4 = y1;
    
        const v1 = new Vertex(x1, y1);
        const v2 = new Vertex(x2, y2);
        const v3 = new Vertex(x3, y3);
        const v4 = new Vertex(x4, y4);
    
        this.vertices = [v1, v3, v2, v4];
    } else if (numOfSides === 5) { 
        // pentagon
    } else if (numOfSides === 6) { // hexagon
        const xi = vi.x;
        const yi = vi.y;
        const xj = vj.x; 
        const yj = vj.y;

        const xmid = (xi + xj) / 2;
        const ymid = (yi + yj) / 2;

        const x1 = (xi + xmid) / 2;
        const y1 = yi;

        const x2 = xi;
        const y2 = ymid;

        const x3 = x1;
        const y3 = yj;

        const x4 = (xmid + xj) / 2;
        const y4 = y3;

        const x5 = xj;
        const y5 = y2;

        const x6 = x4;
        const y6 = y1;

        const v1 = new Vertex(x1, y1);
        const v2 = new Vertex(x2, y2);
        const v3 = new Vertex(x3, y3);
        const v4 = new Vertex(x4, y4);
        const v5 = new Vertex(x5, y5);
        const v6 = new Vertex(x6, y6);

        this.vertices = [v1, v2, v3, v4, v5, v6];
    } // itu aja dulu(?)

    this.color = [];
    for (var i = 0; i < numOfSides; i++) this.color.push(color);
    this.numOfSides = numOfSides;
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
      new Float32Array(Color.flattenColors(this.color))
    );
    webGL.bindBuffer(webGL.ARRAY_BUFFER, colorBuffer);
    enableAttrShader(webGL, shader, "vertexColor", 4);

    webGL.drawArrays(webGL.TRIANGLE_FAN, 0, this.numOfSides);
  }

  /**
   * Change the position of the Polygon's dot by checking its position
   * @param {Vertex} oldVertex
   * @param {Vertex} newVertex
   */
  changeDotPos(oldVertex, newVertex) { 
    var index = -1;
    for (let i = 0; i < this.numOfSides; i++) {
        if (this.vertices[i].isEqual(oldVertex)) {
            index = i;
        }
    }
    this.vertices[index].changePos(newVertex.x, newVertex.y);
  }

  /**
   * Change the color of the Polygon
   * @param {Color} color
   */
  changeColor(color) {
    this.color = [];
    for (var i = 0; i < this.numOfSides; i++) this.color.push(color);
  }
}