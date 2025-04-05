/**
 * FinMentor AI Types
 * 
 * This module defines the types for the FinMentor AI functionality.
 */

// User Profile Types
export interface UserProfile {
  id: string;
  userId: string;
  nivelWeb2: number;
  nivelWeb3: number;
  areasInteres: string[];
  historialTerminos: string[];
  lastUpdated: string;
}

// Educational Content Types
export interface Lesson {
  id: string;
  title: string;
  contenido: string;
  duracionEstimada: number;
  formato: string;
  recursosAdicionales: {
    tipo: string;
    url: string;
  }[];
}

export interface Quiz {
  id: string;
  title: string;
  dificultad: number;
  puntosTotales: number;
  preguntas: {
    id: string;
    pregunta: string;
    opciones: string[];
    respuestaCorrecta: number;
  }[];
}

export interface EducationalModule {
  id: string;
  title: string;
  description: string;
  category: string;
  tipoWeb: 'web2' | 'web3';
  nivelDificultad: number;
  prerequisitos: string[];
  fechaCreacion: string;
  ultimaActualizacion: string;
  lecciones: Lesson[];
  quizzes: Quiz[];
}

export interface FinancialTerm {
  id: string;
  term: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  termType: 'web2' | 'web3';
  relationsBetweenTerms: string[];
  examples: string[];
}

// Progress Tracking Types
export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  porcentajeCompletado: number;
  ultimoAcceso: string;
  leccionesCompletadas: string[];
  quizzesCompletados: string[];
  puntosTotales: number;
}

// NFT Certificate Types
export interface NFTCertificate {
  tokenId: string;
  walletAddress: string;
  moduleId: string;
  userId: string;
  metadataURI: string;
  transactionHash: string;
  fechaEmision: string;
  nivel: number;
  atributos: {
    title: string;
    score: number;
    issuer: string;
    skills: string[];
  };
}

// Repository Interfaces
export interface IUserProfileRepository {
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile | null>;
  findByUserId(userId: string): Promise<UserProfile | null>;
  create(profile: Omit<UserProfile, 'id'>): Promise<UserProfile>;
  update(id: string, profile: Partial<UserProfile>): Promise<UserProfile | null>;
}

export interface IEducationalContentRepository {
  findAllModules(): Promise<EducationalModule[]>;
  findModuleById(id: string): Promise<EducationalModule | null>;
  findModulesByCategory(category: string): Promise<EducationalModule[]>;
  findModulesByWebType(webType: 'web2' | 'web3'): Promise<EducationalModule[]>;
  findModulesByDifficulty(difficulty: number): Promise<EducationalModule[]>;
  createModule(module: Omit<EducationalModule, 'id'>): Promise<EducationalModule>;
  
  findAllTerms(): Promise<FinancialTerm[]>;
  findTermById(id: string): Promise<FinancialTerm | null>;
  findTermsByCategory(category: string): Promise<FinancialTerm[]>;
  findTermsByWebType(webType: 'web2' | 'web3'): Promise<FinancialTerm[]>;
  createTerm(term: Omit<FinancialTerm, 'id'>): Promise<FinancialTerm>;
}

export interface IUserProgressRepository {
  findAll(): Promise<UserProgress[]>;
  findById(id: string): Promise<UserProgress | null>;
  findByUserId(userId: string): Promise<UserProgress[]>;
  findByUserIdAndModuleId(userId: string, moduleId: string): Promise<UserProgress | null>;
  create(progress: Omit<UserProgress, 'id'>): Promise<UserProgress>;
  update(id: string, progress: Partial<UserProgress>): Promise<UserProgress | null>;
  completeLesson(id: string, lessonId: string): Promise<UserProgress | null>;
  completeQuiz(id: string, quizId: string, score: number): Promise<UserProgress | null>;
}

export interface INFTCertificateRepository {
  findAll(): Promise<NFTCertificate[]>;
  findByTokenId(tokenId: string): Promise<NFTCertificate | null>;
  findByWalletAddress(walletAddress: string): Promise<NFTCertificate[]>;
  findByUserId(userId: string): Promise<NFTCertificate[]>;
  findByModuleId(moduleId: string): Promise<NFTCertificate[]>;
  create(certificate: Omit<NFTCertificate, 'tokenId'>): Promise<NFTCertificate>;
}

// Service Interfaces
export interface IUserProfileService {
  getAllProfiles(): Promise<UserProfile[]>;
  getProfileById(id: string): Promise<UserProfile>;
  getProfileByUserId(userId: string): Promise<UserProfile | null>;
  createProfile(profile: Omit<UserProfile, 'id' | 'lastUpdated'>): Promise<UserProfile>;
  updateProfile(id: string, profile: Partial<Omit<UserProfile, 'id' | 'lastUpdated'>>): Promise<UserProfile>;
}

export interface IEducationalContentService {
  getAllModules(): Promise<EducationalModule[]>;
  getModuleById(id: string): Promise<EducationalModule>;
  getModulesByCategory(category: string): Promise<EducationalModule[]>;
  getModulesByWebType(webType: 'web2' | 'web3'): Promise<EducationalModule[]>;
  getModulesByDifficulty(difficulty: number): Promise<EducationalModule[]>;
  createModule(module: Omit<EducationalModule, 'id' | 'fechaCreacion' | 'ultimaActualizacion'>): Promise<EducationalModule>;
  
  getAllTerms(): Promise<FinancialTerm[]>;
  getTermById(id: string): Promise<FinancialTerm>;
  getTermsByCategory(category: string): Promise<FinancialTerm[]>;
  getTermsByWebType(webType: 'web2' | 'web3'): Promise<FinancialTerm[]>;
  createTerm(term: Omit<FinancialTerm, 'id'>): Promise<FinancialTerm>;
}

export interface IUserProgressService {
  getAllProgress(): Promise<UserProgress[]>;
  getProgressById(id: string): Promise<UserProgress>;
  getProgressByUserId(userId: string): Promise<UserProgress[]>;
  getProgressByUserIdAndModuleId(userId: string, moduleId: string): Promise<UserProgress | null>;
  createProgress(progress: Omit<UserProgress, 'id'>): Promise<UserProgress>;
  updateProgress(id: string, progress: Partial<UserProgress>): Promise<UserProgress>;
  completeLesson(id: string, lessonId: string): Promise<UserProgress>;
  completeQuiz(id: string, quizId: string, score: number): Promise<UserProgress>;
}

export interface INFTCertificateService {
  getAllCertificates(): Promise<NFTCertificate[]>;
  getCertificateByTokenId(tokenId: string): Promise<NFTCertificate>;
  getCertificatesByWalletAddress(walletAddress: string): Promise<NFTCertificate[]>;
  getCertificatesByUserId(userId: string): Promise<NFTCertificate[]>;
  getCertificatesByModuleId(moduleId: string): Promise<NFTCertificate[]>;
  createCertificate(certificate: Omit<NFTCertificate, 'tokenId'>): Promise<NFTCertificate>;
}
