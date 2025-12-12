// Comprobar que el archivo JS está cargando bien
console.log("script.js cargado");

/* ======================================
   1. DOM y eventos
   1.1 Contador
   ====================================== */

const contadorTexto = document.getElementById("contador-valor");
const btnSumar = document.getElementById("btn-sumar");
const btnRestar = document.getElementById("btn-restar");
const btnReset = document.getElementById("btn-reset");

let contador = 0;

function actualizarContador(valor) {
  contadorTexto.textContent = valor;
}

// Mostrar el valor inicial
actualizarContador(contador);

btnSumar.addEventListener("click", () => {
  contador++;
  let resultado = contador * multiplicador;
  actualizarContador(resultado);
});

btnRestar.addEventListener("click", () => {
  contador--;
  let resultado = contador * multiplicador;
  actualizarContador(resultado);
});

btnReset.addEventListener("click", () => {
  contador = 0;
  let resultado = contador * multiplicador;
  actualizarContador(resultado);
});



/* 1.2 Multiplicador*/

const multiplicadorTexto = document.getElementById("multiplicador");
const btnSumarMul = document.getElementById("m-btn-sumar");
const btnRestarMul = document.getElementById("m-btn-restar");
const btnResetMul = document.getElementById("m-btn-reset");

let multiplicador = 1;

function actualizarMultiplicador() {
  multiplicadorTexto.textContent = multiplicador;
}

//Mostrar valor inicial
actualizarMultiplicador();

btnSumarMul.addEventListener("click", () => {
  multiplicador++;
  actualizarMultiplicador();
});

btnRestarMul.addEventListener("click", () => {
  multiplicador--;
  actualizarMultiplicador();
});

btnResetMul.addEventListener("click", () => {
  multiplicador = 1;
  actualizarMultiplicador();
});


/* ======================================
   1.3 Mostrar / ocultar texto
   ====================================== */

const btnToggleTexto = document.getElementById("btn-toggle-texto");
const textoToggle = document.getElementById("texto-toggle");

btnToggleTexto.addEventListener("click", () => {
  textoToggle.classList.toggle("oculto");
});

/* ======================================
   2. Arrays y objetos "locales"
   ====================================== */

const btnCargarLocal = document.getElementById("btn-cargar-local");
const listaTareas = document.getElementById("lista-tareas");

// Simula datos que podría devolver una API
const tareas = [
  { id: 1, titulo: "Estudiar JavaScript", completada: false },
  { id: 2, titulo: "Practicar con APIs", completada: false },
  { id: 3, titulo: "Descansar un rato", completada: true }
];

function mostrarTareas() {
  listaTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.titulo + (tarea.completada ? " ✅" : "");
    listaTareas.appendChild(li);
  });
}

btnCargarLocal.addEventListener("click", () => {
  mostrarTareas();
});

/* ======================================
   3. API de usuarios
   https://jsonplaceholder.typicode.com/users
   ====================================== */

const btnCargarUsuarios = document.getElementById("btn-cargar-usuarios");
const listaUsuarios = document.getElementById("lista-usuarios");

async function cargarUsuarios() {
  try {
    btnCargarUsuarios.disabled = true;
    btnCargarUsuarios.textContent = "Cargando...";

    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("Error HTTP: " + respuesta.status);
    }

    const usuarios = await respuesta.json();

    listaUsuarios.innerHTML = "";

    usuarios.forEach((usuario) => {
      const li = document.createElement("li");
      li.textContent = `${usuario.name} (${usuario.email})`;
      listaUsuarios.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    listaUsuarios.innerHTML = "<li>Ocurrió un error al cargar los usuarios.</li>";
  } finally {
    btnCargarUsuarios.disabled = false;
    btnCargarUsuarios.textContent = "Cargar usuarios";
  }
}

btnCargarUsuarios.addEventListener("click", () => {
  cargarUsuarios();
});

/* ======================================
   4. API de chistes
   https://api.chucknorris.io/jokes/random
   ====================================== */

const btnChiste = document.getElementById("btn-chiste");
const textoChiste = document.getElementById("texto-chiste");

async function cargarChiste() {
  try {
    btnChiste.disabled = true;
    btnChiste.textContent = "Cargando...";

    const respuesta = await fetch("https://api.chucknorris.io/jokes/random");

    if (!respuesta.ok) {
      throw new Error("Error HTTP: " + respuesta.status);
    }

    const data = await respuesta.json();

    textoChiste.textContent = data.value;
  } catch (error) {
    console.error("Error al cargar chiste:", error);
    textoChiste.textContent = "Ocurrió un error al cargar el chiste.";
  } finally {
    btnChiste.disabled = false;
    btnChiste.textContent = "Obtener chiste";
  }
}

btnChiste.addEventListener("click", () => {
  cargarChiste();
});

/* ======================================
   5. API de imágenes (perritos)
   https://dog.ceo/api/breeds/image/random
   ====================================== */

const btnPerro = document.getElementById("btn-perro");
const imgPerro = document.getElementById("img-perro");

async function cargarPerro() {
  try {
    btnPerro.disabled = true;
    btnPerro.textContent = "Cargando...";

    const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");

    if (!respuesta.ok) {
      throw new Error("Error HTTP: " + respuesta.status);
    }

    const data = await respuesta.json();

    imgPerro.src = data.message;
    imgPerro.alt = "Perrito aleatorio";
  } catch (error) {
    console.error("Error al cargar perrito:", error);
    imgPerro.alt = "Error al cargar perrito.";
  } finally {
    btnPerro.disabled = false;
    btnPerro.textContent = "Ver perrito aleatorio";
  }
}

btnPerro.addEventListener("click", () => {
  cargarPerro();
});

/* ======================================
   6. Buscador con API (Pokémon)
   https://pokeapi.co/api/v2/pokemon/{nombre}
   ====================================== */

const formPokemon = document.getElementById("form-pokemon");
const inputPokemon = document.getElementById("input-pokemon");
const resultadoPokemon = document.getElementById("resultado-pokemon");

function mostrarMensajePokemon(mensaje) {
  resultadoPokemon.innerHTML = `<p>${mensaje}</p>`;
}

function renderizarPokemon(data) {
  const nombre = data.name;
  const id = data.id;
  const imagen = data.sprites?.front_default;
  const tipos = data.types.map((t) => t.type.name).join(", ");

  resultadoPokemon.innerHTML = `
    <h3>${nombre} (ID: ${id})</h3>
    ${imagen ? `<img src="${imagen}" alt="${nombre}" />` : ""}
    <p><strong>Tipos:</strong> ${tipos}</p>
  `;
}

async function buscarPokemon(nombreCrudo) {
  const nombre = nombreCrudo.trim().toLowerCase();

  if (!nombre) {
    mostrarMensajePokemon("Por favor, escribe el nombre de un Pokémon.");
    return;
  }

  try {
    mostrarMensajePokemon("Buscando Pokémon...");

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        mostrarMensajePokemon("No se encontró ese Pokémon. Revisa el nombre.");
        return;
      }
      throw new Error("Error HTTP: " + respuesta.status);
    }

    const data = await respuesta.json();
    renderizarPokemon(data);
  } catch (error) {
    console.error("Error al buscar Pokémon:", error);
    mostrarMensajePokemon("Ocurrió un error al buscar el Pokémon.");
  }
}

formPokemon.addEventListener("submit", (event) => {
  event.preventDefault(); // evitar recargar la página
  buscarPokemon(inputPokemon.value);
});
