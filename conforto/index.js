let automatico = true;

let temperatura = 25;
let umidade = 60;
let som = 0;

function clickAutomatico(element) {
  automatico = element.checked;
}

function clicarMedidor(e, tipo) {
  const rect = e.target.getBoundingClientRect();
  const valorPorcentragem = 1 - e.offsetY / rect.height;
  if(tipo === "temperatura"){
    temperatura = valorPorcentragem * 50;
  }
  if(tipo === "umidade"){
    umidade = valorPorcentragem * 100;
  }
  if(tipo === "som"){
    som = valorPorcentragem * 120;
  }

  atualizarMedidores();
}

function gerarValoresAmbiente() {
  if (!automatico)
    return;
  const deltaTemperatura = (Math.random() * 4) - 2;
  const novaTemperatura = temperatura + deltaTemperatura;
  temperatura = Math.min(50, Math.max(0, novaTemperatura));

  const deltaUmidade = (Math.random() * 4) - 2;
  const novaUmidade = umidade + deltaUmidade;
  umidade = Math.min(100, Math.max(0, novaUmidade));

  const deltaSom = (Math.random() * 40) - 30;
  const novaSom = som + deltaSom;
  som = Math.min(100, Math.max(0, novaSom));
}

function atualizarMedidores() {
  document.getElementById("valorTemperatura").style.height = `${Math.ceil((temperatura / 50) * 100)}%`
  document.getElementById("valorTemperaturaTexto").innerHTML = `${Math.ceil(temperatura)} °C`
  document.getElementById("valorUmidade").style.height = `${Math.ceil((umidade / 100) * 100)}%`
  document.getElementById("valorUmidadeTexto").innerHTML = `${Math.ceil(umidade)} %`
  document.getElementById("valorSom").style.height = `${Math.ceil((som / 120) * 100)}%`
  document.getElementById("valorSomTexto").innerHTML = `${Math.ceil(som)} dB`
}

setTimeout(() => {
  document.getElementById("medidorTemperatura").onclick = (e) => clicarMedidor(e, "temperatura")
  document.getElementById("medidorUmidade").onclick = (e) => clicarMedidor(e, "umidade")
  document.getElementById("medidorSom").onclick = (e) => clicarMedidor(e, "som")
}, 1000);

setInterval(() => {
  gerarValoresAmbiente();
  atualizarMedidores();
}, 1000);