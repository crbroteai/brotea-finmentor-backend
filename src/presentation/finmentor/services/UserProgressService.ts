import { IUserProgressRepository, IUserProgressService, UserProgress } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * Implementation of the UserProgressService
 */
export class UserProgressService implements IUserProgressService {
  constructor(private repository: IUserProgressRepository) {}

  /**
   * Get all progress records
   */
  async getAllProgress(): Promise<UserProgress[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error in UserProgressService.getAllProgress:', error);
      throw error;
    }
  }

  /**
   * Get a progress record by ID
   */
  async getProgressById(id: string): Promise<UserProgress> {
    try {
      const progress = await this.repository.findById(id);
      
      if (!progress) {
        throw new NotFoundError(`Progress record with ID ${id} not found`);
      }
      
      return progress;
    } catch (error) {
      console.error(`Error in UserProgressService.getProgressById(${id}):`, error);
      throw error;
    }
  }

  /**
   * Get progress records by user ID
   */
  async getProgressByUserId(userId: string): Promise<UserProgress[]> {
    try {
      return await this.repository.findByUserId(userId);
    } catch (error) {
      console.error(`Error in UserProgressService.getProgressByUserId(${userId}):`, error);
      throw error;
    }
  }

  /**
   * Get a progress record by user ID and module ID
   */
  async getProgressByUserIdAndModuleId(userId: string, moduleId: string): Promise<UserProgress | null> {
    try {
      return await this.repository.findByUserIdAndModuleId(userId, moduleId);
    } catch (error) {
      console.error(`Error in UserProgressService.getProgressByUserIdAndModuleId(${userId}, ${moduleId}):`, error);
      throw error;
    }
  }

  /**
   * Create a new progress record
   */
  async createProgress(progress: Omit<UserProgress, 'id'>): Promise<UserProgress> {
    try {
      // Check if progress record already exists for this user and module
      const existingProgress = await this.repository.findByUserIdAndModuleId(
        progress.userId,
        progress.moduleId
      );
      
      if (existingProgress) {
        throw new Error(`Progress record already exists for user ${progress.userId} and module ${progress.moduleId}`);
      }
      
      // Set default values if not provided
      const newProgress: Omit<UserProgress, 'id'> = {
        ...progress,
        porcentajeCompletado: progress.porcentajeCompletado || 0,
        ultimoAcceso: progress.ultimoAcceso || new Date().toISOString(),
        leccionesCompletadas: progress.leccionesCompletadas || [],
        quizzesCompletados: progress.quizzesCompletados || [],
        puntosTotales: progress.puntosTotales || 0
      };
      
      return await this.repository.create(newProgress);
    } catch (error) {
      console.error('Error in UserProgressService.createProgress:', error);
      throw error;
    }
  }

  /**
   * Update a progress record
   */
  async updateProgress(id: string, progress: Partial<UserProgress>): Promise<UserProgress> {
    try {
      const updatedProgress = await this.repository.update(id, progress);
      
      if (!updatedProgress) {
        throw new NotFoundError(`Progress record with ID ${id} not found`);
      }
      
      return updatedProgress;
    } catch (error) {
      console.error(`Error in UserProgressService.updateProgress(${id}):`, error);
      throw error;
    }
  }

  /**
   * Complete a lesson
   */
  async completeLesson(id: string, lessonId: string): Promise<UserProgress> {
    try {
      const updatedProgress = await this.repository.completeLesson(id, lessonId);
      
      if (!updatedProgress) {
        throw new NotFoundError(`Progress record with ID ${id} not found`);
      }
      
      return updatedProgress;
    } catch (error) {
      console.error(`Error in UserProgressService.completeLesson(${id}, ${lessonId}):`, error);
      throw error;
    }
  }

  /**
   * Complete a quiz
   */
  async completeQuiz(id: string, quizId: string, score: number): Promise<UserProgress> {
    try {
      const updatedProgress = await this.repository.completeQuiz(id, quizId, score);
      
      if (!updatedProgress) {
        throw new NotFoundError(`Progress record with ID ${id} not found`);
      }
      
      return updatedProgress;
    } catch (error) {
      console.error(`Error in UserProgressService.completeQuiz(${id}, ${quizId}, ${score}):`, error);
      throw error;
    }
  }
}
