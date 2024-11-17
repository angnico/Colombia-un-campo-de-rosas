let textoLista = ["1-texto.txt", "2-texto.txt", "3-texto.txt", "4-texto.txt"];
let textoElegido;
let textoVisible;

let imgLista = ["Collage_Hermana_16112024.jpg", "Collage_Hija_15112024.jpg", "Collage_Madre_16112024.jpg"];
let imgElegido;
let imgVisible;

let canvas;
let startIndex = 0;
let camara;
let isHovering = false;

function preload() 
{
    cargarTextoAleatorio();
    cargarImagenAleatoria();
}

function setup() 
{
    frameRate(5);
    canvas = createCanvas(windowWidth, windowHeight);
    textFont("Courier-Light");
    
    camara = createCapture(VIDEO);
    camara.size(100, 100);
    camara.hide();

    canvas.mouseOver(() => 
    {
        isHovering = true; // 
        cargarTextoAleatorio(); 
        cargarImagenAleatoria(); 
    });

    canvas.mouseOut(() => {
        isHovering = false;
        cargarTextoAleatorio();
        cargarImagenAleatoria(); 
    });
}

function draw() 
{
    if (isHovering) 
    {
        muestra_ASCII_Video();
    } else 
    {
        muestra_ASCII_Imagenes();
    }
}

function cargarTextoAleatorio() {
    textoElegido = random(textoLista);
    loadStrings(textoElegido, (data) => {
        let textoCargado = data;
        textoVisible = textoCargado.join(' ');
    });
}

function cargarImagenAleatoria() {
    imgElegido = random(imgLista);
    imgVisible = loadImage(imgElegido);
    resize(imgVisible = width/10, height/10);
}

function muestra_ASCII_Imagenes() {
    clear();
    background(0);

    let charIndex = startIndex;
    let w = (width / imgVisible.width);
    let h = (height / imgVisible.height);

    imgVisible.loadPixels();

    for (let j = 0; j < imgVisible.height; j++) {
        for (let i = 0; i < imgVisible.width; i++) {
            const pixelIndex = (i + j * imgVisible.width) * 4;
            const r = imgVisible.pixels[pixelIndex + 0];
            const g = imgVisible.pixels[pixelIndex + 1];
            const b = imgVisible.pixels[pixelIndex + 2];
            
            noStroke();
            fill(r,g,b);
            textSize(w * 1.2);
            textAlign(CENTER, CENTER);
            text(textoVisible.charAt(charIndex % textoVisible.length), i * w + w * 0.5, j * h + h * 0.5);
            charIndex++;
        }
    }
    startIndex++;
}

function muestra_ASCII_Video() 
{
    clear();
    background(0);
    camara.loadPixels();

    let w = width / camara.width;
    let h = height / camara.height;
    let charIndex = startIndex;

    for (let j = 0; j < camara.height; j++) {
        for (let i = 0; i < camara.width; i++) {
            const pixelIndex = (i + j * camara.width) * 4;
            const r = camara.pixels[pixelIndex + 0];
            const g = camara.pixels[pixelIndex + 1];
            const b = camara.pixels[pixelIndex + 2];
            avg = (r+g+b)/3;
            fill(avg);
            noStroke();
            textSize(w * 1);
            textAlign(CENTER, CENTER);
            let charToDisplay = textoVisible.charAt(charIndex % textoVisible.length);
            text(charToDisplay, i * w + w * 0.5, j * h + h * 0.5);
            charIndex++;
        }
    }
    startIndex += camara.width * camara.height;
}

