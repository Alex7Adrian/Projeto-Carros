const estados = {
  s0: "Carro Desligado",
  s1: "Carro Ligado com Sucesso",
  s2: "Carro Ligado com Falha",
  s3: "Carro com Bateria Nova",
  s4: "Carro com Problema Mecânico",
  f1: "Falha na Bateria",
  f2: "Carro Funcionando com Pequenos Defeitos",
  f3: "Carro Funcionando mas Não Confiável",
  n1: "Oficina Recomendada",
  n2: "Problema Resolvido na Oficina",
  n3: "Problema Não Resolvido"
};

const finaisFelizes = ["s1", "n2"];
let finaisFelizesCount = 0;

const transicoes = {
  s0: [
    { acao: "Tentar ligar o carro", transicao: "s1", probabilidade: 0.8 },
    { acao: "Tentar ligar o carro", transicao: "s2", probabilidade: 0.15 },
    { acao: "Tentar ligar o carro", transicao: "s0", probabilidade: 0.05 }
  ],
  s1: [
    { acao: "Usar o carro normalmente", transicao: "f2", probabilidade: 0.4 },
    { acao: "Usar o carro normalmente", transicao: "f3", probabilidade: 0.3 },
    { acao: "Levar à oficina para verificação", transicao: "n1", probabilidade: 0.5 },
    { acao: "Levar à oficina para verificação", transicao: "n2", probabilidade: 0.3 },
    { acao: "Levar à oficina para verificação", transicao: "n3", probabilidade: 0.2 }
  ],
  s2: [
    { acao: "Levar à oficina", transicao: "s4", probabilidade: 0.5 },
    { acao: "Levar à oficina", transicao: "n1", probabilidade: 0.2 },
    { acao: "Levar à oficina", transicao: "n3", probabilidade: 0.3 }
  ]
};

const acoes = {
  s0: ["Tentar ligar o carro"],
  s1: ["Usar o carro normalmente", "Levar à oficina para verificação"],
  s2: ["Levar à oficina"],
  s3: ["Tentar ligar o carro"],
  s4: ["Levar à oficina"],
  f1: ["Substituir a bateria"],
  f2: ["Verificar mecânica"],
  f3: ["Levar à oficina"],
  n1: ["Aguardar mais informações"],
  n2: ["Testar novamente"],
  n3: ["Levar para outra oficina"]
};

let qTable = {};
for (let estado in estados) {
  qTable[estado] = {};
  (acoes[estado] || []).forEach(acao => {
    qTable[estado][acao] = Math.random();
  });
}

const taxaAprendizado = 0.1;
const fatorDesconto = 0.9;
const epsilon = 0.1;

let estadoAtual = "s0";
let interacao = 0;

let logList = document.getElementById("logList");

const ctx = document.getElementById("qTableChart").getContext("2d");
const qTableChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Valor Médio da Q-Table",
      borderColor: "blue",
      data: []
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Interações" } },
      y: { title: { display: true, text: "Valor Q Médio" } }
    }
  }
});

function atualizarEstado() {
  document.querySelector("#estadoAtual h2").textContent = `Estado Atual: ${estados[estadoAtual]}`;
  document.getElementById("finalFelizNumero").textContent = finaisFelizesCount;
  exibirQTable();
  atualizarBotoes();
}

function atualizarBotoes() {
  const btnAcao = document.getElementById("btnAcao");
  const btnSubstituirBateria = document.getElementById("btnSubstituirBateria");
  const btnLevarOficina = document.getElementById("btnLevarOficina");

  btnAcao.style.display = "none";
  btnSubstituirBateria.style.display = "none";
  btnLevarOficina.style.display = "none";

  const disponiveis = acoes[estadoAtual] || [];

  if (disponiveis.some(a => a.toLowerCase().includes("ligar") || a.toLowerCase().includes("usar") || a.toLowerCase().includes("verificação") || a.toLowerCase().includes("testar"))) {
    btnAcao.style.display = "block";
  }
  if (disponiveis.some(a => a.toLowerCase().includes("bateria"))) {
    btnSubstituirBateria.style.display = "block";
  }
  if (disponiveis.some(a => a.toLowerCase().includes("oficina"))) {
    btnLevarOficina.style.display = "block";
  }
}

function escolherAcao() {
  const disponiveis = acoes[estadoAtual];
  if (!disponiveis || disponiveis.length === 0) return null;

  if (Math.random() < epsilon) {
    return disponiveis[Math.floor(Math.random() * disponiveis.length)];
  } else {
    return disponiveis.reduce((maxAcao, acao) => {
      return qTable[estadoAtual][acao] > qTable[estadoAtual][maxAcao] ? acao : maxAcao;
    });
  }
}

function atualizarQTable(acao, recompensa, novoEstado) {
  const qValorAtual = qTable[estadoAtual][acao];
  const maxNovoQ = Math.max(...(acoes[novoEstado] || []).map(a => qTable[novoEstado]?.[a] || 0));
  qTable[estadoAtual][acao] = qValorAtual + taxaAprendizado * (recompensa + fatorDesconto * maxNovoQ - qValorAtual);

  interacao++;
  const mediaQ = calcularMediaQ();
  qTableChart.data.labels.push(interacao);
  qTableChart.data.datasets[0].data.push(mediaQ);
  qTableChart.update();
}

function calcularMediaQ() {
  let total = 0;
  let count = 0;
  for (let estado in qTable) {
    for (let acao in qTable[estado]) {
      total += qTable[estado][acao];
      count++;
    }
  }
  return count > 0 ? total / count : 0;
}

function adicionarLog(acao, novoEstado) {
  const li = document.createElement("li");
  li.textContent = `${acao} -> Novo Estado: ${estados[novoEstado]}`;
  logList.appendChild(li);
}

function executarAcao() {
  const acaoEscolhida = escolherAcao();
  if (!acaoEscolhida) return;

  const transicoesPossiveis = (transicoes[estadoAtual] || []).filter(t => t.acao === acaoEscolhida);

  let acumulado = 0;
  const sorteio = Math.random();
  let novoEstado = estadoAtual;

  for (const t of transicoesPossiveis) {
    acumulado += t.probabilidade;
    if (sorteio <= acumulado) {
      novoEstado = t.transicao;
      break;
    }
  }

  if (finaisFelizes.includes(novoEstado)) {
    finaisFelizesCount++;
  }

  const recompensa = novoEstado === "s1" ? 10 : -5;

  atualizarQTable(acaoEscolhida, recompensa, novoEstado);
  estadoAtual = novoEstado;
  adicionarLog(acaoEscolhida, novoEstado);
  atualizarEstado();
}

function reiniciarSimulacao() {
  estadoAtual = "s0";
  logList.innerHTML = "<li>Estado Inicial: Carro Desligado</li>";
  interacao = 0;
  finaisFelizesCount = 0;
  qTableChart.data.labels = [];
  qTableChart.data.datasets[0].data = [];
  qTableChart.update();
  atualizarEstado();
}

function exibirQTable() {
  const qTableElement = document.getElementById("qTable");
  qTableElement.textContent = JSON.stringify(qTable, null, 2);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarEstado();
  document.getElementById("btnAcao").addEventListener("click", executarAcao);
  document.getElementById("btnSubstituirBateria").addEventListener("click", executarAcao);
  document.getElementById("btnLevarOficina").addEventListener("click", executarAcao);
  document.getElementById("btnReiniciar").addEventListener("click", reiniciarSimulacao);
});
