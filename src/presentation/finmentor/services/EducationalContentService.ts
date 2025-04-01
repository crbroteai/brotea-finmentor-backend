import { 
  IEducationalContentRepository, 
  IEducationalContentService, 
  EducationalModule, 
  FinancialTerm 
} from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * Implementation of the EducationalContentService
 */
export class EducationalContentService implements IEducationalContentService {
  constructor(private repository: IEducationalContentRepository) {}

  /**
   * Get all educational modules
   */
  async getAllModules(): Promise<EducationalModule[]> {
    try {
      return await this.repository.findAllModules();
    } catch (error) {
      console.error('Error in EducationalContentService.getAllModules:', error);
      throw error;
    }
  }

  /**
   * Get an educational module by ID
   */
  async getModuleById(id: string): Promise<EducationalModule> {
    try {
      const module = await this.repository.findModuleById(id);
      
      if (!module) {
        throw new NotFoundError(`Educational module with ID ${id} not found`);
      }
      
      return module;
    } catch (error) {
      console.error(`Error in EducationalContentService.getModuleById(${id}):`, error);
      throw error;
    }
  }

  /**
   * Get educational modules by category
   */
  async getModulesByCategory(category: string): Promise<EducationalModule[]> {
    try {
      return await this.repository.findModulesByCategory(category);
    } catch (error) {
      console.error(`Error in EducationalContentService.getModulesByCategory(${category}):`, error);
      throw error;
    }
  }

  /**
   * Get educational modules by web type
   */
  async getModulesByWebType(webType: 'web2' | 'web3'): Promise<EducationalModule[]> {
    try {
      return await this.repository.findModulesByWebType(webType);
    } catch (error) {
      console.error(`Error in EducationalContentService.getModulesByWebType(${webType}):`, error);
      throw error;
    }
  }

  /**
   * Get educational modules by difficulty level
   */
  async getModulesByDifficulty(difficulty: number): Promise<EducationalModule[]> {
    try {
      return await this.repository.findModulesByDifficulty(difficulty);
    } catch (error) {
      console.error(`Error in EducationalContentService.getModulesByDifficulty(${difficulty}):`, error);
      throw error;
    }
  }

  /**
   * Create a new educational module
   */
  async createModule(module: Omit<EducationalModule, 'id' | 'fechaCreacion' | 'ultimaActualizacion'>): Promise<EducationalModule> {
    try {
      const now = new Date().toISOString();
      
      return await this.repository.createModule({
        ...module,
        fechaCreacion: now,
        ultimaActualizacion: now
      });
    } catch (error) {
      console.error('Error in EducationalContentService.createModule:', error);
      throw error;
    }
  }

  /**
   * Get all financial terms
   */
  async getAllTerms(): Promise<FinancialTerm[]> {
    try {
      return await this.repository.findAllTerms();
    } catch (error) {
      console.error('Error in EducationalContentService.getAllTerms:', error);
      throw error;
    }
  }

  /**
   * Get a financial term by ID
   */
  async getTermById(id: string): Promise<FinancialTerm> {
    try {
      const term = await this.repository.findTermById(id);
      
      if (!term) {
        throw new NotFoundError(`Financial term with ID ${id} not found`);
      }
      
      return term;
    } catch (error) {
      console.error(`Error in EducationalContentService.getTermById(${id}):`, error);
      throw error;
    }
  }

  /**
   * Get financial terms by category
   */
  async getTermsByCategory(category: string): Promise<FinancialTerm[]> {
    try {
      return await this.repository.findTermsByCategory(category);
    } catch (error) {
      console.error(`Error in EducationalContentService.getTermsByCategory(${category}):`, error);
      throw error;
    }
  }

  /**
   * Get financial terms by web type
   */
  async getTermsByWebType(webType: 'web2' | 'web3'): Promise<FinancialTerm[]> {
    try {
      return await this.repository.findTermsByWebType(webType);
    } catch (error) {
      console.error(`Error in EducationalContentService.getTermsByWebType(${webType}):`, error);
      throw error;
    }
  }

  /**
   * Create a new financial term
   */
  async createTerm(term: Omit<FinancialTerm, 'id'>): Promise<FinancialTerm> {
    try {
      return await this.repository.createTerm(term);
    } catch (error) {
      console.error('Error in EducationalContentService.createTerm:', error);
      throw error;
    }
  }
}
