console.log("script.js cargado");

//DOM y Eventos

const contadorTexto = document.getElementById("contador-valor");
const btnSumar = document.getElementById("btn-sumar");
const btnRestar = document.getElementById("btn-restar");
const btnReset = document.getElementById("btn-reset");

let contador = 0;

function actualizarValor() {
    contadorTexto.textContent = contador;
}

btnSumar.addEventListener("click", () => {
    contador++;
    actualizarValor();
})

btnRestar.addEventListener("click", () => {
    contador--;
    actualizarValor();
})

btnReset.addEventListener("click", () => {
    contador = 0;
    actualizarValor();
})

const btnToggleTexto = document.getElementById("btn-toggle-texto");
const textoToggle = document.getElementById("texto-toggle");

btnToggleTexto.addEventListener("click", () => {
  textoToggle.classList.toggle("oculto");
});


