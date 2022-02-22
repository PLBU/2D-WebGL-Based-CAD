const drawCanvas = (webGL, lines, squares, rectangles, polygons) => {
  webGL.clear(webGL.COLOR_BUFFER_BIT);
  const shader = initShader(webGL);

  for (const line of lines) {
    line.render(webGL, shader);
  }
};