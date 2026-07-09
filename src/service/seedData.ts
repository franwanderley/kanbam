export const initialBoardsSeed = [
  {
    "id": "board-1",
    "title": "Marketing - Lançamento da Campanha Q3",
    "columns": [
      {
        "id": "mkt-todo",
        "title": "Planejamento / A Fazer",
        "color": "#89CFF0",
        "order": 1
      },
      {
        "id": "mkt-doing",
        "title": "Em Produção",
        "color": "#A020F0",
        "order": 2
      },
      {
        "id": "mkt-review",
        "title": "Revisão de Conteúdo",
        "color": "#FFA500",
        "order": 3
      },
      {
        "id": "mkt-done",
        "title": "Publicado / Concluído",
        "color": "#379a7c",
        "order": 4
      }
    ],
    "tasks": [
      {
        "id": "task-mkt-1",
        "title": "Criar roteiros para os vídeos do Reels/TikTok",
        "description": "Escrever 5 roteiros curtos focados nas principais dores do cliente para engajar no tráfego orgânico.",
        "columnId": "mkt-doing",
        "subtasks": [
          {
            "id": "sub-mkt-1-1",
            "title": "Definir temas dos 5 vídeos",
            "isFinish": true
          },
          {
            "id": "sub-mkt-1-2",
            "title": "Escrever gancho inicial",
            "isFinish": true
          },
          {
            "id": "sub-mkt-1-3",
            "title": "Revisar chamadas para ação (CTA)",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-mkt-2",
        "title": "Configurar campanha de tráfego pago no Meta Ads",
        "description": "Subir conjuntos de anúncios com foco em público morno (lookalike e engajamento recente).",
        "columnId": "mkt-todo",
        "subtasks": [
          {
            "id": "sub-mkt-2-1",
            "title": "Selecionar melhores criativos da pasta de design",
            "isFinish": false
          },
          {
            "id": "sub-mkt-2-2",
            "title": "Definir orçamento diário e lances",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-mkt-3",
        "title": "Escrever e disparar sequência de email marketing",
        "description": "Sequência de 3 emails pós-cadastro para incentivar a compra inicial do curso.",
        "columnId": "mkt-review",
        "subtasks": [
          {
            "id": "sub-mkt-3-1",
            "title": "Email 1: Boas-vindas e história de sucesso",
            "isFinish": true
          },
          {
            "id": "sub-mkt-3-2",
            "title": "Email 2: Entrega de valor e bônus",
            "isFinish": true
          },
          {
            "id": "sub-mkt-3-3",
            "title": "Email 3: Oferta por tempo limitado (urgência)",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-mkt-4",
        "title": "Definir cronograma de postagens para o Blog",
        "description": "Planejar os temas de SEO que serão abordados nas próximas 4 semanas.",
        "columnId": "mkt-done",
        "subtasks": [
          {
            "id": "sub-mkt-4-1",
            "title": "Pesquisa de palavras-chave no Semrush",
            "isFinish": true
          },
          {
            "id": "sub-mkt-4-2",
            "title": "Esboçar a estrutura dos 4 artigos",
            "isFinish": true
          }
        ]
      }
    ]
  },
  {
    "id": "board-2",
    "title": "Dev - Aplicativo Delivery",
    "columns": [
      {
        "id": "dev-backlog",
        "title": "Backlog do Produto",
        "color": "#485d6a",
        "order": 1
      },
      {
        "id": "dev-todo",
        "title": "A Fazer (Sprint 1)",
        "color": "#89CFF0",
        "order": 2
      },
      {
        "id": "dev-doing",
        "title": "Em Desenvolvimento",
        "color": "#A020F0",
        "order": 3
      },
      {
        "id": "dev-testing",
        "title": "Em Testes / QA",
        "color": "#c45236",
        "order": 4
      },
      {
        "id": "dev-done",
        "title": "Entregue em Produção",
        "color": "#379a7c",
        "order": 5
      }
    ],
    "tasks": [
      {
        "id": "task-dev-1",
        "title": "Integração do Pix com Mercado Pago",
        "description": "Desenvolver o fluxo de geração de QR Code Copia e Cola e a validação do webhook de confirmação de pagamento.",
        "columnId": "dev-doing",
        "subtasks": [
          {
            "id": "sub-dev-1-1",
            "title": "Ler documentação do SDK do Mercado Pago",
            "isFinish": true
          },
          {
            "id": "sub-dev-1-2",
            "title": "Criar endpoint para geração do QR Code",
            "isFinish": true
          },
          {
            "id": "sub-dev-1-3",
            "title": "Configurar webhook e atualização do status da compra no banco",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-dev-2",
        "title": "Autenticação via Google e Apple Sign-In",
        "description": "Implementar o login social no aplicativo mobile usando React Native Firebase Auth.",
        "columnId": "dev-todo",
        "subtasks": [
          {
            "id": "sub-dev-2-1",
            "title": "Configurar projetos no Firebase Console",
            "isFinish": false
          },
          {
            "id": "sub-dev-2-2",
            "title": "Adicionar credenciais nas chaves de desenvolvimento (Android/iOS)",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-dev-3",
        "title": "Otimização de carregamento das imagens no feed",
        "description": "Implementar compressão automática das fotos dos produtos e cache local para reduzir uso de dados.",
        "columnId": "dev-testing",
        "subtasks": [
          {
            "id": "sub-dev-3-1",
            "title": "Configurar biblioteca de cache de imagens",
            "isFinish": true
          },
          {
            "id": "sub-dev-3-2",
            "title": "Escrever testes de performance de renderização",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-dev-4",
        "title": "Ajustar layout responsivo do Carrinho de Compras",
        "description": "Corrigir quebras de layout em telas menores (iPhone SE / celulares antigos de 5 polegadas).",
        "columnId": "dev-done",
        "subtasks": [
          {
            "id": "sub-dev-4-1",
            "title": "Identificar elementos sobrepostos no CSS",
            "isFinish": true
          },
          {
            "id": "sub-dev-4-2",
            "title": "Ajustar flexbox e espaçamentos dinâmicos",
            "isFinish": true
          }
        ]
      }
    ]
  },
  {
    "id": "board-3",
    "title": "RH & Onboarding - Boas-vindas",
    "columns": [
      {
        "id": "rh-todo",
        "title": "Preparação Pré-Chegada",
        "color": "#e7dbc6",
        "order": 1
      },
      {
        "id": "rh-doing",
        "title": "Primeira Semana",
        "color": "#c47878",
        "order": 2
      },
      {
        "id": "rh-done",
        "title": "Onboarding Concluído",
        "color": "#151751",
        "order": 3
      }
    ],
    "tasks": [
      {
        "id": "task-rh-1",
        "title": "Enviar kit de boas-vindas do novo colaborador",
        "description": "Comprar e despachar garrafa térmica, caderno, camiseta da empresa e o notebook de trabalho.",
        "columnId": "rh-todo",
        "subtasks": [
          {
            "id": "sub-rh-1-1",
            "title": "Confirmar tamanho da camiseta e endereço de entrega",
            "isFinish": true
          },
          {
            "id": "sub-rh-1-2",
            "title": "Solicitar compra do notebook ao setor de TI",
            "isFinish": true
          },
          {
            "id": "sub-rh-1-3",
            "title": "Despachar via transportadora e enviar código de rastreamento",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-rh-2",
        "title": "Apresentação da cultura organizacional",
        "description": "Reunião de 1h com a equipe de RH para apresentar os valores, benefícios e rotinas da empresa.",
        "columnId": "rh-doing",
        "subtasks": [
          {
            "id": "sub-rh-2-1",
            "title": "Agendar chamada no Google Meet",
            "isFinish": true
          },
          {
            "id": "sub-rh-2-2",
            "title": "Apresentar manual do colaborador",
            "isFinish": false
          }
        ]
      },
      {
        "id": "task-rh-3",
        "title": "Configuração das ferramentas de trabalho (Slack, Gmail, Jira)",
        "description": "Criar e-mail corporativo e convidar para os canais corretos no Slack e painéis do Jira.",
        "columnId": "rh-done",
        "subtasks": [
          {
            "id": "sub-rh-3-1",
            "title": "Criar conta @empresa.com",
            "isFinish": true
          },
          {
            "id": "sub-rh-3-2",
            "title": "Enviar convite do Slack e Notion",
            "isFinish": true
          }
        ]
      }
    ]
  }
];
