class Color {
  /**
   * Create a Color Object with RGBA
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   */
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * Create a Color Object with predefined RGBA using String
   * @param {string} name
   * @returns {Color}
   */
  static createColorByName(name) {
    let result = new Color(0, 0, 0, 0);
    switch (name) {
      case "black":
        result.r = 0;
        result.g = 0;
        result.b = 0;
        result.a = 1;
        return result;
      case "red":
        result.r = 1;
        result.g = 0;
        result.b = 0;
        result.a = 1;
        return result;
      case "green":
        result.r = 0;
        result.g = 1;
        result.b = 0;
        result.a = 1;
        return result;
      case "blue":
        result.r = 0;
        result.g = 0;
        result.b = 1;
        result.a = 1;
        return result;
      case "yellow":
        result.r = 1;
        result.g = 1;
        result.b = 0;
        result.a = 1;
        return result;
      case "magenta":
        result.r = 1;
        result.g = 0;
        result.b = 1;
        result.a = 1;
        return result;
      case "cyan":
        result.r = 0;
        result.g = 1;
        result.b = 1;
        result.a = 1;
        return result;
      default:
        result.r = 1;
        result.g = 1;
        result.b = 1;
        result.a = 1;
        return result;
    }
  }

  /**
   * Create a 1D Array flattened for WebGL
   * @param {Array<Color>} colors
   * @returns {Array<Number>}
   */
  static flattenColors(colors) {
    let result = [];

    console.log(colors)
    for (const color of colors) {
      result = [...result, color.r, color.g, color.b, color.a];
    }

    return result;
  }
}
