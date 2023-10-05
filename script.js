let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/LHtpibQJf/'; // URL del modelo de Teachable Machine
let fileInput;
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  fileInput = createFileInput(handleFile); // Crea un input de archivo y llama a la función handleFile cuando se selecciona un archivo
  fileInput.position(0, height); // Establece la posición del input de archivo
}

function draw() {
  background(0); // Establece el fondo negro
  fill(255); // Establece el color de relleno blanco
  textSize(16); // Establece el tamaño de la fuente
  textAlign(CENTER); // Establece la alineación del texto al centro
  text(label, width / 2, height - 4); // Muestra la etiqueta de la clasificación en la parte inferior del canvas
  let emoji = { // Objeto que asocia las etiquetas de clasificación con emojis
    "Jugador Español": "😊",
    "Jugador Polaco": "🤣"
  }[label];
  textSize(100); // Establece el tamaño de la fuente
  text(emoji, width / 2, height / 2); // Muestra el emoji correspondiente a la etiqueta de clasificación en el centro del canvas
}

function classifyImage(img) {
  classifier.classify(img, gotResult); // Clasifica la imagen y llama a la función gotResult cuando se obtienen los resultados
}

function handleFile(file) {
  if (file.type === 'image') { // Verifica que el archivo sea una imagen
    let img = createImg(file.data, ''); // Crea un elemento de imagen y carga el archivo
    img.hide(); // Oculta la imagen original
    classifyImage(img); // Clasifica la imagen
  } else {
    console.log('El archivo seleccionado no es una imagen.');
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error); // Muestra el error en la consola
    return;
  }
  label = results[0].label; // Obtiene la etiqueta de clasificación del primer resultado
}