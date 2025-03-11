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