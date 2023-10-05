let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/LHtpibQJf/'; // URL del modelo de Teachable Machine
let fileInput;
let label = "";
let img;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // Carga el modelo antes de que se cargue la página
}

function setup() {
  fileInput = createFileInput(handleFile); // Crea un input de archivo y llama a la función handleFile cuando se selecciona un archivo
  createCanvas(1200, 900); // Crea un canvas de 640x480 píxeles
}

function classifyImage() {
  classifier.classify(img, gotResult); // Clasifica la imagen y llama a la función gotResult cuando se obtienen los resultados
}

function handleFile(file) {
  if (file.type === 'image') { // Verifica que el archivo sea una imagen
    img = createImg(file.data, ''); // Crea un elemento de imagen y carga el archivo
    img.hide(); // Oculta la imagen original
    img.size(640, 480); // Establece el tamaño de la imagen
    image(img, 0, 0); // Muestra la imagen en el canvas
    classifyImage(); // Clasifica la imagen
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
  fill(0); // Establece el color de relleno negro
  textSize(32); // Establece el tamaño de la fuente
  textAlign(CENTER); // Establece la alineación del texto al centro
  text(label, width / 2, height - 50); // Muestra la etiqueta de la clasificación en la parte inferior del canvas
  let player = { // Objeto que asocia las etiquetas de clasificación con los nombres de los jugadores
    "españoles":"gavi",
    "polacos":"lewandoski"
  }[label];
  textSize(48); // Establece el tamaño de la fuente
  text(player, width / 2, height / 2); // Muestra el nombre del jugador correspondiente a la etiqueta de clasificación en el centro del canvas
  if (img) {
    image(img, 0, 0, width, height / 2); // Muestra la imagen en la parte superior del canvas
  }
}