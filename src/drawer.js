var lines = [];
var squares = [];
var rectangles = [];
var polygons = [];

const drawCanvas = (webGL) => {
  webGL.clear(webGL.COLOR_BUFFER_BIT);
  const shader = initShader(webGL);

  for (const line of lines) {
    line.render(webGL, shader);
  }
};

const drawTempCanvas = (webGL, tempShape) => {
  drawCanvas(webGL);
  const shader = initShader(webGL);

  if (tempShape) tempShape.render(webGL, shader);
}

const clearCanvas = (event, webGL) => {
  event.returnValue = false;

  lines = [];
  squares = [];
  rectangles = [];
  polygons = [];

  webGL.clear(webGL.COLOR_BUFFER_BIT);
};
