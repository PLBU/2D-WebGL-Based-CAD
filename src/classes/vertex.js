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
   * Get the Euclidean Distance of 2 vertices
   * @param {Vertex} v1
   * @param {Vertex} v2
   * @returns {Number}
   */
  static getEuclideanDist(v1, v2) {
    var a = v1.x - v2.x;
    var b = v1.y - v2.y;

    return Math.hypot(a, b);
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

  /**
   * Compare vertex with other vertex
   * @param {Vertex} vtx other vertex
   * @returns Boolean
   */
  isEqual(vtx) {
    return this.x === vtx.x && this.y === vtx.y;
  }
}
