import { 
  IEducationalContentRepository, 
  EducationalModule, 
  FinancialTerm 
} from '../finmentor.types';

/**
 * Mock implementation of the EducationalContentRepository
 */
export class EducationalContentRepository implements IEducationalContentRepository {
  private modules: EducationalModule[] = [
    {
      id: 'mod-1',
      title: 'Fundamentos de Finanzas Personales',
      description: 'Aprende los conceptos básicos para gestionar tus finanzas personales de manera efectiva',
      category: 'finanzas-personales',
      tipoWeb: 'web2',
      nivelDificultad: 1,
      prerequisitos: [],
      fechaCreacion: '2024-01-15T00:00:00Z',
      ultimaActualizacion: '2024-02-20T00:00:00Z',
      lecciones: [
        {
          id: 'lec-1-1',
          title: 'Presupuesto Personal',
          contenido: 'Un presupuesto personal es una herramienta financiera que te ayuda a planificar y controlar tus ingresos y gastos...',
          duracionEstimada: 10,
          formato: 'texto',
          recursosAdicionales: [
            { tipo: 'video', url: 'https://example.com/video1' },
            { tipo: 'plantilla', url: 'https://example.com/template1' }
          ]
        },
        {
          id: 'lec-1-2',
          title: 'Ahorro e Inversión Básica',
          contenido: 'El ahorro es la base de la salud financiera. Aprender a separar una parte de tus ingresos...',
          duracionEstimada: 15,
          formato: 'texto',
          recursosAdicionales: [
            { tipo: 'calculadora', url: 'https://example.com/calculator1' }
          ]
        }
      ],
      quizzes: [
        {
          id: 'quiz-1',
          title: 'Evaluación de Fundamentos Financieros',
          dificultad: 1,
          puntosTotales: 100,
          preguntas: [
            {
              id: 'q1',
              pregunta: '¿Cuál es el primer paso para crear un presupuesto personal?',
              opciones: [
                'Calcular gastos fijos',
                'Determinar ingresos mensuales',
                'Establecer metas de ahorro',
                'Analizar gastos variables'
              ],
              respuestaCorrecta: 1
            },
            {
              id: 'q2',
              pregunta: '¿Qué porcentaje de ingresos se recomienda destinar al ahorro?',
              opciones: [
                '5%',
                '10-20%',
                '50%',
                'Lo que sobre al final del mes'
              ],
              respuestaCorrecta: 1
            }
          ]
        }
      ]
    },
    {
      id: 'mod-2',
      title: 'Introducción a las Criptomonedas',
      description: 'Conoce los fundamentos de las criptomonedas y la tecnología blockchain',
      category: 'crypto',
      tipoWeb: 'web3',
      nivelDificultad: 2,
      prerequisitos: ['mod-1'],
      fechaCreacion: '2024-01-20T00:00:00Z',
      ultimaActualizacion: '2024-03-01T00:00:00Z',
      lecciones: [
        {
          id: 'lec-2-1',
          title: '¿Qué es Blockchain?',
          contenido: 'Blockchain es una tecnología de registro distribuido que permite mantener una lista creciente de registros...',
          duracionEstimada: 12,
          formato: 'texto',
          recursosAdicionales: [
            { tipo: 'video', url: 'https://example.com/blockchain-video' },
            { tipo: 'infografía', url: 'https://example.com/blockchain-infographic' }
          ]
        },
        {
          id: 'lec-2-2',
          title: 'Bitcoin y Ethereum',
          contenido: 'Bitcoin fue la primera criptomoneda, creada en 2009 por una persona o grupo bajo el seudónimo de Satoshi Nakamoto...',
          duracionEstimada: 15,
          formato: 'texto',
          recursosAdicionales: [
            { tipo: 'artículo', url: 'https://example.com/bitcoin-vs-ethereum' }
          ]
        }
      ],
      quizzes: [
        {
          id: 'quiz-2',
          title: 'Evaluación de Conocimientos Blockchain',
          dificultad: 2,
          puntosTotales: 100,
          preguntas: [
            {
              id: 'q1',
              pregunta: '¿Qué característica define principalmente a una blockchain?',
              opciones: [
                'Velocidad de transacción',
                'Inmutabilidad y descentralización',
                'Facilidad de uso',
                'Bajo costo operativo'
              ],
              respuestaCorrecta: 1
            },
            {
              id: 'q2',
              pregunta: '¿Cuál es la principal diferencia entre Bitcoin y Ethereum?',
              opciones: [
                'El precio',
                'La fecha de creación',
                'Bitcoin es solo moneda, Ethereum permite contratos inteligentes',
                'Bitcoin es más seguro'
              ],
              respuestaCorrecta: 2
            }
          ]
        }
      ]
    }
  ];

  private terms: FinancialTerm[] = [
    {
      id: 'term-1',
      termino: 'ETF',
      definicionCorta: 'Fondo cotizado en bolsa',
      definicionLarga: 'Un ETF (Exchange-Traded Fund) es un tipo de fondo de inversión que cotiza en bolsa como una acción...',
      categoria: 'inversiones',
      tipoWeb: 'web2',
      terminosRelacionados: ['fondo indexado', 'comisiones', 'diversificación'],
      ejemplos: ['SPDR S&P 500 ETF (SPY)', 'iShares MSCI Emerging Markets ETF (EEM)']
    },
    {
      id: 'term-2',
      termino: 'DeFi',
      definicionCorta: 'Finanzas descentralizadas',
      definicionLarga: 'DeFi (Decentralized Finance) se refiere a aplicaciones financieras construidas sobre redes blockchain...',
      categoria: 'crypto',
      tipoWeb: 'web3',
      terminosRelacionados: ['lending', 'yield farming', 'liquidity pool', 'smart contract'],
      ejemplos: ['Uniswap', 'Aave', 'Compound']
    },
    {
      id: 'term-3',
      termino: 'Staking',
      definicionCorta: 'Bloqueo de criptomonedas para validar transacciones',
      definicionLarga: 'El staking consiste en mantener fondos en una wallet para participar en el funcionamiento de una red blockchain...',
      categoria: 'crypto',
      tipoWeb: 'web3',
      terminosRelacionados: ['proof of stake', 'validator', 'rewards'],
      ejemplos: ['Ethereum 2.0', 'Cardano', 'Solana']
    }
  ];

  /**
   * Find all educational modules
   */
  async findAllModules(): Promise<EducationalModule[]> {
    return [...this.modules];
  }

  /**
   * Find a module by ID
   */
  async findModuleById(id: string): Promise<EducationalModule | null> {
    const module = this.modules.find(m => m.id === id);
    return module ? { ...module } : null;
  }

  /**
   * Find modules by category
   */
  async findModulesByCategory(category: string): Promise<EducationalModule[]> {
    return this.modules.filter(m => m.category === category).map(m => ({ ...m }));
  }

  /**
   * Find modules by web type
   */
  async findModulesByWebType(webType: 'web2' | 'web3'): Promise<EducationalModule[]> {
    return this.modules.filter(m => m.tipoWeb === webType).map(m => ({ ...m }));
  }

  /**
   * Find modules by difficulty level
   */
  async findModulesByDifficulty(difficulty: number): Promise<EducationalModule[]> {
    return this.modules.filter(m => m.nivelDificultad === difficulty).map(m => ({ ...m }));
  }

  /**
   * Create a new educational module
   */
  async createModule(module: Omit<EducationalModule, 'id'>): Promise<EducationalModule> {
    const newModule: EducationalModule = {
      id: `mod-${this.modules.length + 1}`,
      ...module
    };

    this.modules.push(newModule);
    return { ...newModule };
  }

  /**
   * Find all financial terms
   */
  async findAllTerms(): Promise<FinancialTerm[]> {
    return [...this.terms];
  }

  /**
   * Find a term by ID
   */
  async findTermById(id: string): Promise<FinancialTerm | null> {
    const term = this.terms.find(t => t.id === id);
    return term ? { ...term } : null;
  }

  /**
   * Find terms by category
   */
  async findTermsByCategory(category: string): Promise<FinancialTerm[]> {
    return this.terms.filter(t => t.categoria === category).map(t => ({ ...t }));
  }

  /**
   * Find terms by web type
   */
  async findTermsByWebType(webType: 'web2' | 'web3'): Promise<FinancialTerm[]> {
    return this.terms.filter(t => t.tipoWeb === webType).map(t => ({ ...t }));
  }

  /**
   * Create a new financial term
   */
  async createTerm(term: Omit<FinancialTerm, 'id'>): Promise<FinancialTerm> {
    const newTerm: FinancialTerm = {
      id: `term-${this.terms.length + 1}`,
      ...term
    };

    this.terms.push(newTerm);
    return { ...newTerm };
  }
}
