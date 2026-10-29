/** Textos estruturados do site (listas, módulos e perguntas frequentes). */

export const rotatingWords = [
  "lucra de verdade",
  "deve cobrar por produto",
  "ainda pode faturar no ano",
  "gasta todo mês"
];

export const pains = [
  {
    icon: "swap",
    title: "Dinheiro do negócio misturado com o pessoal",
    text: "Quando tudo sai da mesma conta, fica impossível saber se o negócio dá lucro ou se está sendo sustentado pelo seu salário."
  },
  {
    icon: "tag",
    title: "Preço definido no chute",
    text: "Sem considerar insumos, tempo de trabalho e taxas, um produto que vende muito pode estar dando prejuízo."
  },
  {
    icon: "alert",
    title: "Risco de passar do limite",
    text: "Ultrapassar R$ 81 mil no ano pode levar ao desenquadramento do MEI e à cobrança de impostos retroativos."
  },
  {
    icon: "clock",
    title: "Contas e DAS esquecidos",
    text: "Boletos vencidos geram multa e juros, e a declaração anual acaba ficando para a última hora."
  }
] as const;

export const modules = [
  {
    label: "Painel",
    img: "/img/painel.webp",
    w: 1600,
    h: 1241,
    alt: "Painel financeiro do MEI com faturamento, lucro, uso do limite e tabela mês a mês",
    title: "Visão completa do seu negócio em uma tela",
    items: [
      "Faturamento, lucro e saldo em caixa do ano atualizados automaticamente",
      "Indicador do limite do MEI com projeção até dezembro e alertas por cor",
      "Resumo de qualquer mês, com comparação ao mês anterior",
      "Gráficos de faturamento, despesas e categorias de gasto"
    ]
  },
  {
    label: "Precificação",
    img: "/img/precificacao.webp",
    w: 1600,
    h: 473,
    alt: "Calculadora de preço com preço sugerido e diagnóstico de cada produto",
    title: "Preços que cobrem custos e remuneram o seu trabalho",
    items: [
      "Cálculo do valor da sua hora com base no pró-labore desejado e nos custos fixos",
      "Preço sugerido por produto ou serviço, já considerando taxas de cartão e margem",
      "Diagnóstico do preço atual: saudável, abaixo da margem ou com prejuízo",
      "Valor de retirada mensal segura, sem comprometer o caixa"
    ]
  },
  {
    label: "Contas e DAS",
    img: "/img/contas.webp",
    w: 1600,
    h: 546,
    alt: "Contas a pagar e a receber com totais pendentes e status automático",
    title: "Vencimentos sob controle",
    items: [
      "Contas a pagar e a receber com status automático: em dia, vence hoje, próximos 7 dias ou atrasada",
      "Previsão de saldo para os próximos 7 dias",
      "Os 12 vencimentos do DAS no ano, com alerta de atraso",
      "Prazo e valor de faturamento para a declaração anual (DASN-SIMEI)"
    ]
  },
  {
    label: "Lançamentos",
    img: "/img/lancamentos.webp",
    w: 1600,
    h: 763,
    alt: "Lançamentos de entradas e saídas com categorias e resumo do ano",
    title: "Registro rápido e sem erros",
    items: [
      "Uma linha por movimentação, com categorias e formas de pagamento em listas prontas",
      "Separação clara entre gastos do negócio e gastos pessoais",
      "Validação automática de datas e valores",
      "Resumo de entradas, saídas e saldo sempre visível"
    ]
  }
];

export const steps = [
  { n: "1", title: "Registre", text: "Anote cada entrada e saída com data, valor e categoria. Os dados de exemplo mostram exatamente como preencher." },
  { n: "2", title: "Acompanhe", text: "O Painel se atualiza sozinho e mostra lucro, saldo em caixa e quanto do limite do MEI já foi usado." },
  { n: "3", title: "Decida", text: "Ajuste preços, planeje retiradas e antecipe pagamentos com base em números reais, não em estimativas." }
];

export const included = [
  { icon: "grid", tag: "", title: "Planilha para Excel com menu interativo", text: "Oito módulos acessados por botões, com navegação simples. Compatível com Excel para Windows e Mac." },
  { icon: "phone", tag: "", title: "Versão para Google Planilhas", text: "Os mesmos cálculos e recursos, para usar no navegador ou no celular, sem instalar nada." },
  { icon: "broom", tag: "", title: "Dados de exemplo e botão Limpar", text: "Explore a planilha preenchida antes de começar. Com um clique, ela fica pronta para os seus dados." },
  { icon: "", tag: "Bônus 1", title: "Guia prático de precificação", text: "Um passo a passo objetivo para definir preços que cubram os custos e paguem o seu trabalho." },
  { icon: "", tag: "Bônus 2", title: "Calendário de obrigações do MEI 2027", text: "Datas do DAS e da declaração anual reunidas em uma página para consulta ou impressão." },
  { icon: "", tag: "Bônus 3", title: "Vídeo de primeiros passos", text: "Uma demonstração curta, do primeiro lançamento à leitura do Painel." }
];

export const forWho = {
  yes: [
    "Microempreendedores individuais e autônomos de comércio e serviços: confeitaria, beleza, estética, fotografia, artesanato, consultoria e outros",
    "Quem quer organizar as finanças sem pagar mensalidade de sistema",
    "Quem não domina Excel e precisa de uma ferramenta pronta para usar"
  ],
  no: [
    "Empresas enquadradas como ME ou EPP, com contabilidade completa",
    "Negócios que precisam emitir nota fiscal ou controlar estoque detalhado",
    "Quem procura um substituto para o contador"
  ]
};

export const faqs = [
  { q: "Preciso saber usar Excel?", a: "Não. Você preenche apenas as células amarelas, escolhendo as opções nas listas. Todas as fórmulas já estão prontas e protegidas contra exclusão acidental." },
  { q: "Preciso ter o Excel instalado?", a: "Não necessariamente. A versão para Google Planilhas funciona gratuitamente com uma conta Google. O menu interativo com botões requer o Excel para computador (Windows ou Mac)." },
  { q: "A planilha funciona no celular?", a: "Sim, pela versão para Google Planilhas, que acompanha a compra. Para lançamentos do dia a dia no celular, ela é a opção mais prática." },
  { q: "Como e quando eu recebo?", a: "Assim que o pagamento é confirmado, você recebe um e-mail com o acesso aos arquivos. No Pix e no cartão de crédito, a liberação costuma ocorrer em poucos minutos." },
  { q: "Quais são as formas de pagamento?", a: "Pix, cartão de crédito e boleto bancário. As opções de parcelamento são exibidas na página de pagamento." },
  { q: "Meus dados ficam seguros?", a: "Sim. A planilha fica no seu computador ou na sua conta Google. Nenhuma informação financeira que você registra é enviada para nós." },
  { q: "Serve para os próximos anos?", a: "Sim. Basta escolher o ano nas Configurações e atualizar o salário mínimo e o limite do MEI quando houver mudança. Recomendamos uma cópia por ano." },
  { q: "Não sou MEI, sou autônomo. Serve para mim?", a: "Serve. Lançamentos, Painel, Contas, Precificação e Pró-labore funcionam para qualquer pequeno negócio. Os alertas de limite e o controle do DAS podem ser ignorados." },
  { q: "A planilha substitui um contador?", a: "Não. Ela organiza suas finanças e sinaliza limites e prazos. Para questões fiscais, ou caso o faturamento ultrapasse o limite, consulte um contador." }
];
