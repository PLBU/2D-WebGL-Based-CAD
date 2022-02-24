var mousePosition;
var isDrawing = false;
var commitedVertices = [];

function handleMouseMove(event, webGL) {
  const boundingClientRect = event.target.getBoundingClientRect();

  mousePosition = {
    x: ((event.clientX - boundingClientRect.left) / webGL.canvas.width) * 2 - 1,
    y: -1 * (((event.clientY - boundingClientRect.top) / webGL.canvas.height) * 2 - 1),
  };

  if (isDrawing) {
    const lastCommitedVertex = commitedVertices[commitedVertices.length - 1];
    const tempVertex = new Vertex(mousePosition.x, mousePosition.y);
    const black = Color.createColorByName("black");
    const tempLine = new Line([lastCommitedVertex, tempVertex], [black, black]);

    drawTempCanvas(webGL, tempLine); 
  }
}

function handleMouseDown(webGL) {
  commitedVertices.push(new Vertex(mousePosition.x, mousePosition.y));

  if (!isDrawing) {
    isDrawing = true;
  } else {
    const black = Color.createColorByName("black");
    
    lines.push(new Line(commitedVertices, [black, black]));
    
    drawCanvas(webGL);

    commitedVertices = [];
    temporaryVertex = null;
    isDrawing = false;
  }
}