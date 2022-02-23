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

  document.onmousemove = (e) => handleMouseMove(e, gl);
  document.onmousedown = (e) => handleMouseDown(gl);
};

window.onload = onLoad;