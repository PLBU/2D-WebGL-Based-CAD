var mousePosition;
var isDrawing = false;
var commitedVertices = [];
var selectedVertex;
var selectedShape;

const getShapeToBeDrawn = (vertices) => {
  var shape;
  const shapeString = document.getElementById("shape_select").value;
  const colorString = document.getElementById("color_select").value;
  const sideString = document.getElementById("polygon_sides_select").value;
  const canvas = document.getElementById("my_canvas");

  const selectedColor = Color.createColorByName(colorString);

  switch (shapeString) {
    case "line":
      shape = new Line(vertices, selectedColor);
      break;
    case "square":
      shape = new Square(vertices, selectedColor, canvas.width / canvas.height);
      break;
    case "rectangle":
      shape = new Rectangle(vertices, selectedColor);
      break;
    case "polygon":
      shape = new Polygon(parseInt(sideString), vertices, selectedColor);
      break;
  }

  return shape;
};

const getNearestVertexByPos = (x, y) => {
  const testVertex = new Vertex(x, y);

  var nearestVertex;
  var nearestDist = Vertex.getEuclideanDist(shapes[0].vertices[0], testVertex);
  for (const shape of shapes) {
    for (const vertex of shape.vertices) {
      var currDist = Vertex.getEuclideanDist(vertex, testVertex);

      if (currDist <= nearestDist) {
        nearestDist = currDist;
        nearestVertex = vertex;
      }
    }
  }

  return nearestVertex;
};

const getNearestShapeByPos = (x, y) => {
  const testVertex = new Vertex(x, y);

  var nearestShape;
  var nearestDist = Vertex.getEuclideanDist(shapes[0].vertices[0], testVertex);
  for (const shape of shapes) {
    for (const vertex of shape.vertices) {
      var currDist = Vertex.getEuclideanDist(vertex, testVertex);

      if (currDist <= nearestDist) {
        nearestDist = currDist;
        nearestShape = shape;
      }
    }
  }

  return nearestShape;
};

const getDifferentVertexFromShape = (shape, v) => {
  for (const vertex of shape.vertices) {
    if (!vertex.isEqual(v)) return vertex;
  }
};

const handleDrawMode = (webGL) => {
  commitedVertices.push(new Vertex(mousePosition.x, mousePosition.y));

  if (!isDrawing) {
    isDrawing = true;
  } else {
    shapes.push(getShapeToBeDrawn(commitedVertices));

    drawCanvas(webGL);

    commitedVertices = [];
    isDrawing = false;
  }
};

const handleChangeVertexMode = (webGL) => {
  if (!isDrawing) {
    selectedVertex = getNearestVertexByPos(mousePosition.x, mousePosition.y);
    selectedShape = getNearestShapeByPos(mousePosition.x, mousePosition.y);

    commitedVertices.push(
      getDifferentVertexFromShape(selectedShape, selectedVertex)
    );

    // Remove the current shape
    shapes = shapes.filter((shape) => shape !== selectedShape);

    isDrawing = true;
  } else {
    const newVertex = new Vertex(mousePosition.x, mousePosition.y);

    selectedShape.changeVertexPos(selectedVertex, newVertex)
    shapes.push(selectedShape);

    drawCanvas(webGL);

    commitedVertices = [];
    selectedShape = null;
    selectedVertex = null;
    isDrawing = false;
  }
};

const handleChangeColorMode = (webGL) => {
  const colorString = document.getElementById("color_select").value;
  const selectedShape = getNearestShapeByPos(mousePosition.x, mousePosition.y);
  const selectedColor = Color.createColorByName(colorString);

  selectedShape.changeColor(selectedColor);

  drawCanvas(webGL);
}

const handleMouseMove = (event, webGL) => {
  const boundingClientRect = event.target.getBoundingClientRect();

  mousePosition = {
    x: ((event.clientX - boundingClientRect.left) / webGL.canvas.width) * 2 - 1,
    y:
      -1 *
      (((event.clientY - boundingClientRect.top) / webGL.canvas.height) * 2 -
        1),
  };

  if (isDrawing) {
    const lastCommitedVertex = commitedVertices[commitedVertices.length - 1];
    const tempVertex = new Vertex(mousePosition.x, mousePosition.y);
    const tempShape = getShapeToBeDrawn([lastCommitedVertex, tempVertex]);

    drawTempCanvas(webGL, tempShape);
  }
};

const handleMouseDown = (webGL) => {
  const modeString = document.getElementById("mode_select").value;

  switch (modeString) {
    case "draw":
      handleDrawMode(webGL);
      break;
    case "change_vertex":
      handleChangeVertexMode(webGL);
      break;
    case "change_color":
      handleChangeColorMode(webGL);
      break;
    default:
      break;
  }
};
