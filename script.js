const botao = document.getElementById("btn");

const container = document.getElementById("container");

botao.addEventListener("click", () => {

  fetch("produtos.json")

    .then(resposta => resposta.json())

    .then(produtos => {

      container.innerHTML = "";

      produtos.forEach(produto => {

        container.innerHTML += `
        
          <div class="card">

            <h2>${produto.nome}</h2>

            <p>Preço: R$ ${produto.preco}</p>

            <p>Categoria: ${produto.categoria}</p>

            <p>Estoque: ${produto.estoque}</p>

          </div>

        `;
      });

    });

});