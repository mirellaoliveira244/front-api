import { verificarAutenticacao } from './autorizar.js';

(async () => {
  const autenticado = await verificarAutenticacao();
  const overlay = document.getElementById('loading-overlay');
  const conteudo = document.getElementById('conteudo-protegido');

  if (autenticado) {
    overlay.remove(); // Remove o overlay
    conteudo.style.display = 'block'; // Mostra o conteúdo
  }
})();

const botaoSalvar = document.getElementById('submit');
botaoSalvar.addEventListener('click', alterarUsuario);

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const url = `URL_DO_SEU_BACK_END/usuario/${id}`;
const token = localStorage.getItem('jwt');

try {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }
  const data = await response.json();

  console.log(data[0].nome);

  document.getElementById('nome').value = data[0].nome;
  document.getElementById('email').value = data[0].email;
  document.getElementById('senha').value = data[0].senha;

} catch (error) {
  console.error("Erro:", error);
  alert("Usuário não encontrado!");
  window.location.href = 'home.html';
}

async function alterarUsuario(e) {
  e.preventDefault();
  try {
    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();

    console.log(data);

    alert("Usuário alterado com sucesso!");
    window.location.href = 'home.html';

  } catch (error) {
    console.error("Erro:", error);
    alert("Usuário não alterado!");
  }
}