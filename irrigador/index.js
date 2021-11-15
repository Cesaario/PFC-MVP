let umidade = 50;
let irrigador = false;

function rotinaJardim() {
  let velocidadeBase = -1;

  if (irrigador)
    velocidadeBase = 3;

  let novaUmidade = umidade + velocidadeBase;
  umidade = Math.max(0, Math.min(100, novaUmidade))
}

function rotinaIrrigador() {
  const limiarAlto = document.querySelector('input[name="LA"]:checked').value;
  const limiarBaixo = document.querySelector('input[name="LB"]:checked').value;

  const valorLimiarAlto = Number(limiarAlto.replace("%", ""))
  const valorLimiarBaixo = Number(limiarBaixo.replace("%", ""))

  if (!irrigador && umidade < valorLimiarBaixo)
    irrigador = true;

  if (irrigador && umidade > valorLimiarAlto)
    irrigador = false;

  document.getElementById("irrigador").style.display = irrigador ? "block" : "none";
  document.getElementById("mensagemIrrigador").innerHTML = `Irrigador ${irrigador ? "Ligado" : "Desligado"}`
  document.getElementById("mensagemIrrigador").style.color = irrigador ? "#66BB6A" : "#EF5350"
}

function atualizarMedidores() {
  document.getElementById("valorUmidadeTexto").innerHTML = `${umidade} %`
  document.getElementById("valorUmidade").style.height = `${umidade}%`
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
}, 500)