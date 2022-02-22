class Vertex {
  /**
   * Create a Vertex Object
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Create a 1D Array flattened for WebGL 
   * @param {Array<Vertex>} vertices
   * @returns {Array<Number>}
   */
  static flattenVertices(vertices) {
    let result = [];

    for (const vertex of vertices) {
      result = [...result, vertex.x, vertex.y];
    }

    return result;
  }

  /**
   * Change a Vertex Object's position
   * @param {number} x
   * @param {number} y
   */
  changePos(x, y) {
    this.x = x;
    this.y = y;
  }
}
