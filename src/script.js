const onLoad = () => {
  const canvas = document.getElementById("my_canvas");
  const gl = canvas.getContext("webgl");
  const clearBtn = document.getElementById("clear_btn");
  const saveBtn = document.getElementById("save_btn");
  // const loadBtn = document.getElementById("load_btn");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  initCanvas(gl, canvas);

  canvas.onmousemove = (e) => handleMouseMove(e, gl);
  canvas.onmousedown = (e) => handleMouseDown(gl);
  clearBtn.onclick = (e) => clearCanvas(e, gl);
  saveBtn.onclick = (e) => saveCanvas();
  // loadBtn.onclick = (e) => loadCanvas(e);
};

window.onload = onLoad;
