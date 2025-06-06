// Variáveis
let desempenho = 0,
    tentativas = 0,
    acertos = 0,
    jogar = true;

// Elementos DOM
const btnReiniciar = document.getElementById('reiniciar'),
      btnJogarNovamente = document.getElementById('joganovamente'),
      resposta = document.getElementById("resposta");

// Funções
function reiniciar() {
  desempenho = tentativas = acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar();
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

function jogarNovamente() {
  jogar = true;
  
  // Limpa as divs do jogo
  const divis = document.querySelectorAll("div[id='0'], div[id='1'], div[id='2'], div[id='3']");
  divis.forEach(div => div.className = "inicial");
  
  // Remove imagens existentes
  document.getElementById("imagem")?.remove();
  document.getElementById("imgerro")?.remove();
}

function atualizaPlacar() {
  desempenho = tentativas ? (acertos / tentativas) * 100 : 0;
  resposta.innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://pngimg.com/d/smiley_PNG149.png";
  obj.appendChild(img);
}

function verifica(obj) {
  if (!jogar) return alert('Clique em "Jogar novamente"');
  
  jogar = false;
  tentativas++;
  
  if (tentativas === 5) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }
  
  const sorteado = Math.floor(Math.random() * 4);
  
  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    obj.className = "errou";
    acertou(document.getElementById(sorteado));
    
    const imgerro = new Image(100);
    imgerro.id = "imgerro";
    imgerro.src = "https://static-00.iconduck.com/assets.00/emoji-sad-icon-1024x1024-t873gdf3.png";
    obj.appendChild(imgerro);
  }
  
  atualizaPlacar();
}

// 
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);