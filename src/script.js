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

  let lineData = [new Line([0.5, 0.2, 0.8, 0.8], [0, 5, 0, 1, 0, 0, 5, 1]), new Line([0.3, -0.9, 0.8, 0.8], [0, 5, 0, 1, 0, 0, 5, 1])]

  drawCanvas(gl, lineData, null, null, null)
};

window.onload = onLoad;
