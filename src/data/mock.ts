export const specialties = [
  "Trabalhista",
  "Civil",
  "Família",
  "Previdenciário",
  "Criminal",
  "Consumidor",
  "Empresarial",
  "Tributário",
  "Imobiliário"
];

export const mockLawyers = [
  {
    id: "1",
    name: "Dr. Carlos Eduardo Silva",
    title: "Especialista em Direito do Trabalho e Previdenciário",
    specialty: "Trabalhista",
    secondarySpecialties: ["Previdenciário", "Empresarial"],
    city: "São Paulo",
    state: "SP",
    rating: 4.9,
    reviews: 124,
    verified: true,
    oab: "SP 123456",
    type: "Híbrido (Online e Presencial)",
    phone: "(11) 3000-0000",
    email: "contato@carloseduardo.adv.br",
    bio: "Especialista em Direito do Trabalho com mais de 15 anos de atuação na defesa de trabalhadores e empresas. Foco em resoluções ágeis e atendimento humanizado.\n\nCom uma trajetória marcada pela excelência e dedicação ao cliente, atuo buscando sempre a melhor estratégia jurídica para o seu caso. O atendimento inicial serve para entendermos o cenário e desenharmos os próximos passos com clareza e transparência.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200&h=400",
    showSocials: true,
    socials: {
      instagram: "@carloseduardo.adv",
      linkedin: "linkedin.com/in/carloseduardoadv",
      facebook: "",
      youtube: "youtube.com/@carloseduardoadv",
      website: "www.carloseduardo.adv.br",
      officeLink: "Escritório Silva & Associados",
      customLink: "linktr.ee/carloseduardo"
    },
    reviewsList: [
      {
        id: 1,
        name: "João Mendes",
        rating: 5,
        date: "há 2 semanas",
        text: "Excelente profissional! Conduziu meu processo trabalhista com muita transparência e agilidade. O atendimento via WhatsApp facilitou muito a comunicação."
      },
      {
        id: 2,
        name: "Ana Carla Souza",
        rating: 5,
        date: "há 1 mês",
        text: "Muito atencioso e técnico. Me explicou todos os detalhes do caso logo na primeira consulta."
      },
      {
        id: 3,
        name: "Roberto Campos",
        rating: 4,
        date: "há 2 meses",
        text: "Ótimo advogado, resolveu minha questão previdenciária que estava travada há anos no INSS."
      }
    ]
  },
  {
    id: "2",
    name: "Dra. Mariana Costa",
    title: "Especialista em Direito de Família e Sucessões",
    specialty: "Família",
    secondarySpecialties: ["Civil", "Consumidor"],
    city: "Rio de Janeiro",
    state: "RJ",
    rating: 5.0,
    reviews: 89,
    verified: true,
    oab: "RJ 654321",
    type: "Online",
    phone: "(21) 3333-4444",
    email: "mariana@costa.adv.br",
    bio: "Atuação dedicada ao Direito de Família e Sucessões. Divórcios, pensão alimentícia e guarda com discrição, ética e acolhimento em momentos delicados.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=400",
    showSocials: true,
    socials: {
      instagram: "@marianacosta.familia",
      linkedin: "",
      facebook: "facebook.com/marianacosta",
      youtube: "",
      website: "",
      officeLink: "",
      customLink: ""
    },
    reviewsList: [
      {
        id: 1,
        name: "Fernanda Lima",
        rating: 5,
        date: "há 1 semana",
        text: "Dra. Mariana foi um anjo na minha vida durante meu processo de divórcio. Muito humana e competente."
      }
    ]
  },
  {
    id: "3",
    name: "Dr. Roberto Alves",
    title: "Advogado Criminalista",
    specialty: "Criminal",
    secondarySpecialties: ["Empresarial"],
    city: "Belo Horizonte",
    state: "MG",
    rating: 4.8,
    reviews: 210,
    verified: true,
    oab: "MG 98765",
    type: "Presencial",
    phone: "(31) 9999-8888",
    email: "contato@robertoalves.com.br",
    bio: "Advocacia criminal contenciosa e consultiva. Defesa em inquéritos policiais e processos criminais com plantão 24h para emergências.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200&h=400",
    showSocials: false,
    socials: {},
    reviewsList: []
  },
  {
    id: "4",
    name: "Dra. Fernanda Lima",
    title: "Defesa do Consumidor",
    specialty: "Consumidor",
    secondarySpecialties: ["Civil"],
    city: "Curitiba",
    state: "PR",
    rating: 4.7,
    reviews: 56,
    verified: false,
    oab: "PR 45678",
    type: "Online",
    phone: "(41) 3222-1111",
    email: "fernanda@lima.adv.br",
    bio: "Defesa implacável dos direitos do consumidor contra abusos de empresas aéreas, planos de saúde e bancos. Atendimento rápido via WhatsApp.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200&h=400",
    showSocials: true,
    socials: {
      instagram: "@ferlima.adv",
      linkedin: "linkedin.com/in/fernandalimaadv",
      facebook: "",
      youtube: "",
      website: "www.fernandalima.adv.br",
      officeLink: "",
      customLink: ""
    },
    reviewsList: []
  }
];

export const mockTestimonials = [
  {
    name: "João Pedro",
    text: "Encontrei a Dra. Mariana em 5 minutos. O atendimento via WhatsApp foi imediato e ela resolveu meu problema de pensão alimentícia muito rápido.",
    role: "Cliente"
  },
  {
    name: "Dr. Carlos",
    text: "A plataforma transformou a forma como capto clientes. O perfil otimizado me traz contatos qualificados toda semana diretamente no meu celular.",
    role: "Advogado Parceiro"
  }
];

export const adminMetrics = {
  totalLawyers: 1245,
  totalClients: 8430,
  activeProfiles: 1100,
  totalSpecialties: 15,
  recentSignups: [
    { name: "Juliana Santos", type: "Cliente", date: "Hoje" },
    { name: "Dr. Marcos Vinicius", type: "Advogado", date: "Hoje" },
    { name: "Pedro Almeida", type: "Cliente", date: "Ontem" },
  ]
};