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
    ],
    s3: [
      { acao: "Tentar ligar o carro", transicao: "s1", probabilidade: 0.9 },
      { acao: "Tentar ligar o carro", transicao: "f3", probabilidade: 0.05 },
      { acao: "Tentar ligar o carro", transicao: "n2", probabilidade: 0.05 }
    ],
    s4: [
      { acao: "Levar à oficina", transicao: "n2", probabilidade: 0.7 },
      { acao: "Levar à oficina", transicao: "n3", probabilidade: 0.3 }
    ],
    f1: [
      { acao: "Substituir a bateria", transicao: "s1", probabilidade: 0.6 },
      { acao: "Substituir a bateria", transicao: "f2", probabilidade: 0.4 }
    ],
    f2: [
      { acao: "Verificar mecânica", transicao: "f3", probabilidade: 0.5 },
      { acao: "Verificar mecânica", transicao: "n3", probabilidade: 0.5 }
    ],
    f3: [
      { acao: "Levar à oficina", transicao: "n2", probabilidade: 0.7 },
      { acao: "Levar à oficina", transicao: "n3", probabilidade: 0.3 }
    ],
    n1: [
      { acao: "Aguardar mais informações", transicao: "n2", probabilidade: 0.6 },
      { acao: "Aguardar mais informações", transicao: "n3", probabilidade: 0.4 }
    ],
    n2: [
      { acao: "Testar novamente", transicao: "s1", probabilidade: 0.8 },
      { acao: "Testar novamente", transicao: "n3", probabilidade: 0.2 }
    ],
    n3: [
      { acao: "Levar para outra oficina", transicao: "n2", probabilidade: 0.5 },
      { acao: "Levar para outra oficina", transicao: "n3", probabilidade: 0.5 }
    ]
  };
  
  let estadoAtual = "s0"; 
  const estadoTexto = document.querySelector("#estadoAtual h2");
  const loglist = document.getElementById("logList");
  const btnAcao = document.getElementById("btnAcao");
  const btnSubstituirBateria = document.getElementById("btnSubstituirBateria");
  const btnLevarOficina = document.getElementById("btnLevarOficina");
  
  function atualizarEstado() {
    estadoTexto.textContent = `Estado atual: ${estados[estadoAtual]}`;
    atualizarBotoes();
  }
  
  function atualizarBotoes() {
    btnAcao.style.display = "none";
    btnSubstituirBateria.style.display = "none";
    btnLevarOficina.style.display = "none";
  
    
    if (estadoAtual === "s0") {
      btnAcao.style.display = "block";
    } else if (estadoAtual === "s1") {
      btnSubstituirBateria.style.display = "block";
    } else if (estadoAtual === "s2") {
      btnLevarOficina.style.display = "block";
    } else if (estadoAtual === "s3" || estadoAtual === "s4") {
      btnAcao.style.display = "block";
    }
  }
  
  
  function adicionarLog(acao, novoEstado) {
    const li = document.createElement("li");
    li.textContent = `${acao} -> Novo Estado : ${estados[novoEstado]}`;
    loglist.appendChild(li);
  }
  
 
  function executarAcao() {
    const acoes = transicoes[estadoAtual];
    const aleatorio = Math.random();
    let acumulado = 0;
  
    for (let i = 0; i < acoes.length; i++) {
      acumulado += acoes[i].probabilidade;
      if (aleatorio <= acumulado) {
        estadoAtual = acoes[i].transicao;
        adicionarLog(acoes[i].acao, estadoAtual);
        break;
      }
    }
    atualizarEstado();
  }
  
  
  function iniciarSimulacao() {
    atualizarEstado();
    btnAcao.addEventListener("click", executarAcao);
    btnSubstituirBateria.addEventListener("click", executarAcao);
    btnLevarOficina.addEventListener("click", executarAcao);
  }
  
  document.addEventListener("DOMContentLoaded", iniciarSimulacao);
  