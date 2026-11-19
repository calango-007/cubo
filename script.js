
const camera = document.getElementById("cam");
const cenario = document.getElementById("cenario");

const botaoCamera = document.getElementById("botaoCamera");
const botaoAnimacao = document.getElementById("botaoAnimacao");

const cubo = document.getElementById("cubo");
const cuboContainer = document.querySelector(".cubo-container");

const tamanho = document.getElementById("tamanho");
const status = document.getElementById("status");

let stream = null;
let animacaoPausada = false;


//atv/dstv cam

botaoCamera.addEventListener("click", async function () {

    // desl cam
    if (stream !== null) {

        stream.getTracks().forEach(function (track) {
            track.stop();
        });

        stream = null;

        camera.srcObject = null;
        camera.style.display = "none";

        cenario.style.display = "flex";

        botaoCamera.textContent = "Ativar câmera";

        status.textContent = "Câmera desligada.";

        return;
    }

    //pd cam
    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        camera.srcObject = stream;

        camera.style.display = "block";
        cenario.style.display = "none";

        botaoCamera.textContent = "Desativar câmera";

        status.textContent =
            "Câmera ativa! Objeto virtual sobre a imagem.";

    } catch (erro) {

    status.textContent = "Erro: " + erro.name + " - " + erro.message;
    console.error("Erro da câmera:", erro.name, erro.message);
}


});


// start

botaoAnimacao.addEventListener("click", function () {

    if (animacaoPausada === false) {

        cubo.style.animationPlayState = "paused";

        botaoAnimacao.textContent = "Continuar animação";

        animacaoPausada = true;

    } else {

        cubo.style.animationPlayState = "running";

        botaoAnimacao.textContent = "Pausar animação";

        animacaoPausada = false;

    }

});


//tamanho cu

tamanho.addEventListener("input", function () {

    const escala = tamanho.value / 100;

    cuboContainer.style.transform = `scale(${escala})`;

});


//f cam

window.addEventListener("beforeunload", function () {

    if (stream !== null) {

        stream.getTracks().forEach(function (track) {
            track.stop();
        });

    }

});
