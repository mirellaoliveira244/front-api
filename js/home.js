import { verificarAutenticacao } from './autorizar.js';

// Função anônima auto-executável assíncrona.
// O ()() garante que ela seja executada imediatamente ao carregar o script
(async () => {
  // Chama a função 'verificarAutenticacao' de forma assíncrona e espera seu resultado.
  const autenticado = await verificarAutenticacao();

  // Obtém o elemento HTML com o ID 'loading-overlay' (o overlay de carregamento da página)
  const overlay = document.getElementById('loading-overlay');

  // Obtém o elemento HTML com o ID 'conteudo-protegido' (o conteúdo restrito que deve ser exibido após autenticação)
  const conteudo = document.getElementById('conteudo-protegido');

  // Verifica se o usuário foi autenticado com sucesso
  if (autenticado) {
    // Remove o elemento 'overlay' do DOM, ocultando o texto "Carregando..." da tela
    overlay.remove();

    // Altera o estilo do elemento 'conteudo' para 'block', tornando o conteúdo visível
    conteudo.style.display = 'block';
  } 
})();

const urlBase = "https://introducao-api-delta.vercel.app";

const tabelaCorpo = document.getElementById("tabela-usuarios");
tabelaCorpo.innerHTML = 'Aguarde...';

try {
  const endpoint = '/usuario';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  // Loop para preencher a tabela
  data.forEach(usuario => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.senha}</td>
                <td class="acoes">
                  <a class="botaoVer" href="usuario.html?id=${usuario.id}">Ver</a> | 
                  <a class="botaoAlterar" href="alterar-usuario.html?id=${usuario.id}">Alterar</a> | 
                  <a class="botaoExcluir" href="${usuario.id}">Excluir</a>
                </td>
            `;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}




tabelaCorpo.addEventListener('click', acao);

function acao(e) {
  if (e.target.classList.contains("botaoExcluir")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    excluirUsuario(id);
  }
}

async function excluirUsuario(id) {
  try {
    const endpoint = `/usuario/${id}`;
    const urlFinal = urlBase + endpoint;
    const response = await fetch(urlFinal, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    alert('Usuário excluido com sucesso!');

  } catch (error) {
    console.error(error);
    alert('Usuário excluido não foi excluido!');
  }
  window.location.href = 'home.html';
}