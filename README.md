Simulação de Processo de Decisão de Markov (MDP) - Carro
Este projeto é uma simulação de um Processo de Decisão de Markov (MDP) aplicado a um carro, onde o usuário pode interagir com o sistema para simular diferentes cenários relacionados ao estado de um carro. O objetivo é demonstrar como as ações, probabilidades de transição e estados podem ser utilizados para modelar decisões em um ambiente estocástico.

Objetivo
O objetivo do projeto é simular a interação de um carro com falhas, que podem ocorrer em diferentes estados, como "carro desligado", "carro ligado com sucesso", "carro com falha", etc. O usuário pode tomar decisões para substituir peças, levar o carro à oficina ou continuar usando o carro, e o sistema responde com base em probabilidades predefinidas.

Tecnologias Utilizadas
HTML: Estrutura básica da página e interface de usuário.

CSS: Estilo da interface para garantir uma aparência agradável e interatividade.

JavaScript: Lógica de transição entre os estados do carro, simulação de ações e probabilidades de decisão.

Funcionalidades
Estados do Carro:

Carro Desligado (s0)

Carro Ligado com Sucesso (s1)

Carro Ligado com Falha (s2)

Carro com Bateria Nova (s3)

Carro com Problema Mecânico (s4)

Falha na Bateria (f1)

Carro Funcionando com Pequenos Defeitos (f2)

Carro Funcionando mas Não Confiável (f3)

Oficina Recomendada (n1)

Problema Resolvido na Oficina (n2)

Problema Não Resolvido (n3)

Ações:

Tentar ligar o carro

Substituir a bateria

Levar à oficina

Usar o carro normalmente

Verificar a mecânica

Aguardar mais informações

Probabilidades: Cada ação tem uma probabilidade associada que determina o próximo estado. As transições são baseadas nessas probabilidades, criando um cenário estocástico, onde o resultado não é garantido e depende das escolhas e das probabilidades definidas.

Como Funciona
Estado Inicial: O sistema começa com o carro desligado (s0).

Interação do Usuário: O usuário pode clicar em diferentes botões de ação (ex: "Tentar ligar o carro", "Substituir a bateria", etc.).

Probabilidades de Transição: Para cada ação, uma probabilidade de transição para o próximo estado é calculada aleatoriamente, de acordo com a definição no código.

Exibição do Estado: O estado atual do carro é atualizado e exibido na interface para o usuário.

Fluxo de Decisão
Se o carro está desligado (s0), o usuário pode tentar ligá-lo, o que pode resultar no carro sendo ligado com sucesso (s1), com falha (s2), ou mantendo-se desligado (s0).

Se o carro foi ligado com sucesso (s1), o usuário pode substituir a bateria, usar o carro normalmente ou levar à oficina. As probabilidades dessas transições são baseadas nas condições do carro.

Dependendo da escolha do usuário e da probabilidade associada, o carro pode ter falhas ou continuar funcionando até ser levado à oficina para diagnóstico.






