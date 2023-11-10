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
function convertirAVoz() {
     const texto = document.getElementById('outputInput').value;
 
     // Verifica si la API de SpeechSynthesis es compatible con el navegador
     if ('speechSynthesis' in window) {
         // Crea un nuevo objeto SpeechSynthesisUtterance
         const mensaje = new SpeechSynthesisUtterance(texto);
 
         // Configura el idioma de la voz (puedes ajustar esto según tus necesidades)
         mensaje.lang = 'es';
 
         // Utiliza la API de SpeechSynthesis para hablar el texto
         window.speechSynthesis.speak(mensaje);
     } else {
         alert('Tu navegador no admite la API de SpeechSynthesis. Intenta con otro navegador.');
     }
 }
 function limpiarContenido() {
     document.getElementById('outputInput').value = '';
 }
