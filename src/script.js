const onLoad = () => {
  const canvas = document.getElementById("my_canvas");
  const gl = canvas.getContext("webgl");
  const clearBtn = document.getElementById("clear_btn");
  const helpBtn = document.getElementById("help_btn");
  const saveBtn = document.getElementById("save_btn");
  const loadBtn = document.getElementById("load_btn");
  var reader = new FileReader();

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
  loadBtn.onchange = (e) => loadFile(e, reader);
  helpBtn.onclick = (e) => {
    window.alert(`Terdapat 3 Mode untuk 2D Web Based CAD: Draw, Change Vertex, Change Color

Draw  
1. Untuk melakukan draw, pilih opsi "draw" pada Change Mode
2. Pilih model yang ingin digambar pada Shape
3. Pilih warna model pada Color
4. Jika memilih model "Polygon", silakan pilih jumlah sisi poligon pada Polygon Sides
5. Klik kiri pada area abu-abu (Canvas)
6. Gerakkan mouse untuk melihat preview model
7. Lalu klik kiri lagi untuk membuat model pada Canvas
8. Hapus Canvas dengan menge-klik tombol Clear Canvas

Change Vertex  
1. Untuk mengubah posisi vertex, pilih opsi "change vertex" pada Change Mode
2. Klik kiri pada posisi canvas dengan vertex yang ingin diubah posisinya
3. Gerakkan mosue untuk melihat preview model dengan vertex yang sedang diubah posisinya
4. Lalu klik kiri lagi untuk mengubah posisi vertex pada Canvas

Change Color
1. Untuk mengubah warna model, pilih opsi "change color" pada Change Mode
2. Pilih warna model baru pada Color
3. Klik kiri pada posisi canvas pada vertex dari Model yang ingin diubah warnanya

Save/Load
1. Gambar terlebih dahulu pada kanvas
2. Klik tombol Save untuk menyimpan gambar
3. Klik tombol Browse / Choose File untuk menge-load gambar yang sudah disimpan pada kanvas
`);
  };
  reader.onload = (e) => loadReader(gl, reader);
};

window.onload = onLoad;
