const container =
document.getElementById(
  "container-cursos"
);

const filtro =
document.getElementById(
  "filtro-categoria"
);

let cursos = [];

/* =========================
   FETCH JSON
========================= */

fetch("./cursos.json")

.then(resposta => resposta.json())

.then(dados => {

  cursos = dados;

  renderizarCursos(cursos);

})

.catch(erro => {

  console.log(
    "Erro ao carregar JSON",
    erro
  );

});

/* =========================
   RENDERIZAR CURSOS
========================= */

function renderizarCursos(lista){

  container.innerHTML = "";

  lista.forEach(curso => {

    /* =========================
       MAP + JOIN
    ========================= */

    const modulosHTML =
    curso.modulos.map(modulo =>

      `<li>${modulo}</li>`

    ).join("");

    /* =========================
       CARD
    ========================= */

    const card =
    document.createElement("div");

    card.classList.add("card");

    /* =========================
       OPACIDADE ESGOTADO
    ========================= */

    if(curso.vagasEsgotadas){

      card.classList.add(
        "esgotado"
      );

    }

    card.innerHTML = `

      ${
        curso.vagasEsgotadas
        ?
        `<div class="tag">
          Inscrições Encerradas
        </div>`
        :
        ""
      }

      <h2>${curso.titulo}</h2>

      <p class="categoria">
        Categoria:
        ${curso.categoria}
      </p>

      <div class="instrutor">

        <p>
          <strong>Instrutor:</strong>
          ${curso.instrutor.nome}
        </p>

        <p>
          <strong>Experiência:</strong>
          ${curso.instrutor.experiencia}
        </p>

      </div>

      <h3>Módulos:</h3>

      <ul>
        ${modulosHTML}
      </ul>

    `;

    container.appendChild(card);

  });

}

/* =========================
   FILTRO
========================= */

filtro.addEventListener(
  "change",
  () => {

    const categoriaSelecionada =
    filtro.value;

    /* =========================
       MOSTRAR TODOS
    ========================= */

    if(
      categoriaSelecionada ===
      "Todos"
    ){

      renderizarCursos(cursos);

      return;

    }

    /* =========================
       FILTER
    ========================= */

    const cursosFiltrados =
    cursos.filter(curso =>

      curso.categoria ===
      categoriaSelecionada

    );

    renderizarCursos(
      cursosFiltrados
    );

  }
);