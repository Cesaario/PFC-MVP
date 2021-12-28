let automatico = true;

let temperatura = 25;
let umidade = 60;
let som = 0;

let conforto = 50;

let arCondicionadoAutomatico = false;
let umidificadorAutomatico = false;

let statusArCondicionado = false;
let statusUmidificador = false;

function calcularConforto() {
  const deltaTemperatura = Math.abs(temperatura - 25);
  const deltaUmidade = Math.abs(umidade - 60);
  const deltaSom = som;

  const confortoTemperatura = (1 - deltaTemperatura / 25) * 100;
  const confortoUmidade = (1 - deltaUmidade / 60) * 100;
  const confortoSom = (1 - deltaSom / 120) * 100;

  conforto = Math.min(confortoTemperatura, confortoUmidade, confortoSom);
}

function atualizarMedidorConforto() {
  calcularConforto();
  handleSmile(conforto);
  document.getElementById(
    "spanTemperatura"
  ).innerHTML = `Temperatura: ${Math.ceil(temperatura)} °C`;
  document.getElementById("spanUmidade").innerHTML = `Umidade: ${Math.ceil(
    umidade
  )}%`;
  document.getElementById("spanSom").innerHTML = `Som: ${Math.ceil(som)} dB`;
  document.getElementById("spanConforto").innerHTML = `Conforto: ${Math.ceil(
    conforto
  )}%`;
}

function getCorSorriso(value) {
  const hue = ((1 - value) * 120).toString(10);
  return `hsl(${hue},60%,60%)`;
}

function clickAutomatico(element) {
  automatico = element.checked;
}

function clicarMedidor(e, tipo) {
  const rect = e.target.getBoundingClientRect();
  const valorPorcentragem = 1 - e.offsetY / rect.height;
  if (tipo === "temperatura") {
    temperatura = valorPorcentragem * 50;
  }
  if (tipo === "umidade") {
    umidade = valorPorcentragem * 100;
  }
  if (tipo === "som") {
    som = valorPorcentragem * 120;
  }

  atualizarMedidores();
}

function gerarValoresAmbiente() {
  if (!automatico) return;
  const deltaTemperatura = Math.random() * 4 - (statusArCondicionado ? 3 : 2);
  const novaTemperatura = temperatura + deltaTemperatura;
  temperatura = Math.min(50, Math.max(0, novaTemperatura));

  const deltaUmidade = Math.random() * 4 - (statusUmidificador ? 1 : 2) - (statusArCondicionado ? 1 : 0);
  const novaUmidade = umidade + deltaUmidade;
  umidade = Math.min(100, Math.max(0, novaUmidade));

  const deltaSom = Math.random() * 40 - 30;
  const novaSom = som + deltaSom;
  som = Math.min(100, Math.max(0, novaSom));
}

function atualizarMedidores() {
  document.getElementById("valorTemperatura").style.height = `${Math.ceil(
    (temperatura / 50) * 100
  )}%`;
  document.getElementById("valorTemperaturaTexto").innerHTML = `${Math.ceil(
    temperatura
  )} °C`;
  document.getElementById("valorUmidade").style.height = `${Math.ceil(
    (umidade / 100) * 100
  )}%`;
  document.getElementById("valorUmidadeTexto").innerHTML = `${Math.ceil(
    umidade
  )} %`;
  document.getElementById("valorSom").style.height = `${Math.ceil(
    (som / 120) * 100
  )}%`;
  document.getElementById("valorSomTexto").innerHTML = `${Math.ceil(som)} dB`;

  atualizarMedidorConforto();
}

function handleSmile(conforto) {
  const val = conforto;
  const corSmile = getCorSorriso(1 - conforto / 100);
  document.getElementById("sorriso").style.borderRadius =
    Math.abs(50 - val) + "%";
  if (val < 50)
    document.getElementById("sorriso").style.transform =
      "rotate(" + 180 + "deg) translateY(-50px)";
  else
    document.getElementById("sorriso").style.transform = "rotate(" + 0 + "deg)";

  document.getElementById("smiley").style.backgroundColor = corSmile;
}

function rotinaControladores() {
  if (arCondicionadoAutomatico) {
    if (temperatura > 30 && !statusArCondicionado) statusArCondicionado = true;
    else if (temperatura <= 25 && statusArCondicionado)
      statusArCondicionado = false;
  } else statusArCondicionado = false;

  if (umidificadorAutomatico) {
    if (umidade < 40 && !statusUmidificador) statusUmidificador = true;
    else if (umidade >= 60 && statusUmidificador) statusUmidificador = false;
  } else statusUmidificador = false;

  const elementoArCondicionado = document.getElementById(
    "statusArCondicionado"
  );
  const elementoUmidificador = document.getElementById("statusUmidificador");

  elementoArCondicionado.innerHTML = statusArCondicionado
    ? "Ativado"
    : "Desativado";
  elementoUmidificador.innerHTML = statusUmidificador
    ? "Ativado"
    : "Desativado";

  elementoArCondicionado.style.color = statusArCondicionado ? "green" : "red";
  elementoUmidificador.style.color = statusUmidificador ? "green" : "red";
}

function handleInputControlador(e, tipo) {
  if (tipo === "arCondicionado") arCondicionadoAutomatico = e.checked;
  if (tipo === "umidificador") umidificadorAutomatico = e.checked;
}

setTimeout(() => {
  document.getElementById("medidorTemperatura").onclick = (e) =>
    clicarMedidor(e, "temperatura");
  document.getElementById("medidorUmidade").onclick = (e) =>
    clicarMedidor(e, "umidade");
  document.getElementById("medidorSom").onclick = (e) =>
    clicarMedidor(e, "som");
}, 1000);

setInterval(() => {
  gerarValoresAmbiente();
  atualizarMedidores();
  rotinaControladores();
}, 100);
