var mousePosition;
var isDrawing = false;
var commitedVertices = [];

function handleMouseMove(event, webGL) {
  const boundingClientRect = event.target.getBoundingClientRect();

  mousePosition = {
    x: ((event.clientX - boundingClientRect.left) / webGL.canvas.width) * 2 - 1,
    y: -1 * (((event.clientY - boundingClientRect.top) / webGL.canvas.height) * 2 - 1),
  };
}

function handleMouseDown(webGL) {
  console.log(mousePosition);
  commitedVertices.push(new Vertex(mousePosition.x, mousePosition.y));
  if (!isDrawing) {
    isDrawing = true;
  } else {
    console.log("autis");
    const black = Color.createColorByName("black");
    const lineData = [new Line(commitedVertices, [black, black])];

    drawCanvas(webGL, lineData, null, null, null);

    commitedVertices = [];
    isDrawing = false;
  }
}
