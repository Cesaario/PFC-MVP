let umidade = 50;
let irrigador = false;

const limiares = {
  umidadeAlta: {
    alto: 90,
    baixo: 40,
  },
  umidadeMedia: {
    alto: 75,
    baixo: 25,
  },
  umidadeBaixa: {
    alto: 60,
    baixo: 10,
  },
};

function rotinaJardim() {
  let velocidadeBase = -1;

  if (irrigador) velocidadeBase = 3;

  let novaUmidade = umidade + velocidadeBase;
  umidade = Math.max(0, Math.min(100, novaUmidade));
}

function rotinaIrrigador() {
  const seletor = document.getElementById("seletorUmidade");
  const umidadeSelecionada = seletor.options[seletor.selectedIndex].value;
  const limiarAlto = limiares[umidadeSelecionada].alto;
  const limiarBaixo = limiares[umidadeSelecionada].baixo;

  if (!irrigador && umidade < limiarBaixo) irrigador = true;

  if (irrigador && umidade > limiarAlto) irrigador = false;

  document.getElementById("irrigador").style.display = irrigador
    ? "block"
    : "none";
  document.getElementById("mensagemIrrigador").innerHTML = `Irrigador ${
    irrigador ? "Ligado" : "Desligado"
  }`;
  document.getElementById("mensagemIrrigador").style.color = irrigador
    ? "#66BB6A"
    : "#EF5350";
}

function atualizarMedidores() {
  document.getElementById("valorUmidadeTexto").innerHTML = `${umidade} %`;
  document.getElementById("valorUmidade").style.height = `${umidade}%`;
}

function inicio() {
  document.getElementById("LB_25").checked = true;
  document.getElementById("LA_60").checked = true;
}

setTimeout(() => {
  inicio();
}, 100);

setInterval(() => {
  rotinaJardim();
  atualizarMedidores();
  rotinaIrrigador();
}, 350);
