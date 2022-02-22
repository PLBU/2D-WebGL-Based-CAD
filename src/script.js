const onLoad = () => {
  const canvas = document.getElementById("my_canvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  initCanvas(gl, canvas);

  const vertex1 = new Vertex(0.5, 0.2);
  const vertex2 = new Vertex(0.8, 0.8);
  const vertex3 = new Vertex(0.3, -0.9);
  const black = Color.createColorByName("black");
  const red = Color.createColorByName("red");

  let lineData = [new Line([vertex1, vertex2], [black, red]), new Line([vertex3, vertex2], [red, black])]

  drawCanvas(gl, lineData, null, null, null)
};

window.onload = onLoad;
