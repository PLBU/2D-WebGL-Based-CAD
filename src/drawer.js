var shapes = [];

const drawCanvas = (webGL) => {
  webGL.clear(webGL.COLOR_BUFFER_BIT);
  const shader = initShader(webGL);

  for (const shape of shapes) {
    shape.render(webGL, shader);
  }
};

const drawTempCanvas = (webGL, tempShape) => {
  drawCanvas(webGL);
  const shader = initShader(webGL);

  if (tempShape) tempShape.render(webGL, shader);
};

const clearCanvas = (event, webGL) => {
  event.returnValue = false;

  shapes = [];

  webGL.clear(webGL.COLOR_BUFFER_BIT);
};

const saveCanvas = () => {
  function removeByIndex(str, index) {
    return str.slice(0, index) + str.slice(index + 1);
  }

  var shapesToChange = [];
  for (const shape of shapes) {
    shape["type"] = shape.constructor.name;
    shapesToChange.push(shape);
  }

  canvasContent = JSON.stringify(shapesToChange);

  var file = new Blob([canvasContent], {
    type: "application/json",
  });

  var a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "canvas-" + getCurTime() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // untuk format nama file
  function getCurTime() {
    var today = new Date();
    var curTime =
      String(today.getFullYear()) +
      ("0" + today.getMonth()).slice(-2) +
      ("0" + today.getDate()).slice(-2) +
      ("0" + today.getHours()).slice(-2) +
      ("0" + today.getMinutes()).slice(-2) +
      ("0" + today.getSeconds()).slice(-2);
    return curTime;
  }
};

const loadFile = (event, reader) => {
  var file = event.target.files[0];
  if (file) {
    reader.readAsText(file);
  }
};

const loadReader = (webGL, reader) => {
  const canvas = document.getElementById("my_canvas");
  const jsonShapes = JSON.parse(reader.result);

  shapes = [];

  webGL.clear(webGL.COLOR_BUFFER_BIT);

  for (const jsonShape of jsonShapes) {
    var shape;
    switch (jsonShape.type) {
      case "Line":
        shape = new Line(jsonShape.vertices, jsonShape.color[0]);
        break;
      case "Square":
        shape = new Square(
          jsonShape.initialVertices,
          jsonShape.color[0],
          jsonShape.ratio
        );
        break;
      case "Rectangle":
        shape = new Rectangle(jsonShape.initialVertices, jsonShape.color[0]);
        break;
      case "Polygon":
        shape = new Polygon(jsonShape.numOfSides ,jsonShape.initialVertices, jsonShape.color[0]);
        break;
      default:
        break;
    }
    shapes.push(shape);
  }

  drawCanvas(webGL);
};
