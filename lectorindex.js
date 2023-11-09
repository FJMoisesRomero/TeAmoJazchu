console.log("This is index.js");

// All variables
let upload = document.getElementById('upload');
let outputInput = document.getElementById('outputInput');

// Función para leer el archivo y mostrar el contenido en el input
function readFile() {
     // Verificar si se seleccionó un archivo
     if (upload.files.length > 0) {
          // Inicializar FileReader
          let fr = new FileReader();
          fr.readAsText(upload.files[0]);
          fr.onload = function () {
               outputInput.value = fr.result;
          };
     } else {
          alert("Por favor, selecciona un archivo.");
     }
}
