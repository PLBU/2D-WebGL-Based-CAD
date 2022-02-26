var mousePosition;
var isDrawing = false;
var commitedVertices = [];

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
}

const handleMouseMove = (event, webGL) => {
  const boundingClientRect = event.target.getBoundingClientRect();

  mousePosition = {
    x: ((event.clientX - boundingClientRect.left) / webGL.canvas.width) * 2 - 1,
    y: -1 * (((event.clientY - boundingClientRect.top) / webGL.canvas.height) * 2 - 1),
  };

  if (isDrawing) {
    const lastCommitedVertex = commitedVertices[commitedVertices.length - 1];
    const tempVertex = new Vertex(mousePosition.x, mousePosition.y);
    const tempShape = getShapeToBeDrawn([lastCommitedVertex, tempVertex])
    
    drawTempCanvas(webGL, tempShape); 
  }
}

const handleMouseDown = (webGL) => {
  commitedVertices.push(new Vertex(mousePosition.x, mousePosition.y));

  if (!isDrawing) {
    isDrawing = true;
  } else {
    shapes.push(getShapeToBeDrawn(commitedVertices));
    
    drawCanvas(webGL);

    commitedVertices = [];
    isDrawing = false;
  }
}