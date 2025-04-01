import { Request, Response } from 'express';
import { IUserProgressService } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * User Progress Controller
 */
export class UserProgressController {
  constructor(private service: IUserProgressService) {}

  /**
   * Get all progress records
   */
  public getAllProgress = async (_req: Request, res: Response): Promise<void> => {
    try {
      const progress = await this.service.getAllProgress();
      
      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error('Error in UserProgressController.getAllProgress:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get a progress record by ID
   */
  public getProgressById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const progress = await this.service.getProgressById(id);
      
      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error(`Error in UserProgressController.getProgressById(${req.params.id}):`, error);
      
      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get progress records by user ID
   */
  public getProgressByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const progress = await this.service.getProgressByUserId(userId);
      
      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error(`Error in UserProgressController.getProgressByUserId(${req.params.userId}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get a progress record by user ID and module ID
   */
  public getProgressByUserIdAndModuleId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, moduleId } = req.params;
      const progress = await this.service.getProgressByUserIdAndModuleId(userId, moduleId);
      
      if (!progress) {
        res.status(404).json({
          success: false,
          error: `Progress record for user ${userId} and module ${moduleId} not found`
        });
        return;
      }
      
      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      console.error(`Error in UserProgressController.getProgressByUserIdAndModuleId(${req.params.userId}, ${req.params.moduleId}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Create a new progress record
   */
  public createProgress = async (req: Request, res: Response): Promise<void> => {
    try {
      const progress = await this.service.createProgress(req.body);
      
      res.status(201).json({
        success: true,
        data: progress,
        message: 'Progress record created successfully'
      });
    } catch (error) {
      console.error('Error in UserProgressController.createProgress:', error);
      
      if (error instanceof Error && error.message.includes('already exists')) {
        res.status(409).json({
          success: false,
          error: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Update a progress record
   */
  public updateProgress = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const progress = await this.service.updateProgress(id, req.body);
      
      res.json({
        success: true,
        data: progress,
        message: 'Progress record updated successfully'
      });
    } catch (error) {
      console.error(`Error in UserProgressController.updateProgress(${req.params.id}):`, error);
      
      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Complete a lesson
   */
  public completeLesson = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { lessonId } = req.body;
      
      if (!lessonId) {
        res.status(400).json({
          success: false,
          error: 'Missing lessonId in request body'
        });
        return;
      }
      
      const progress = await this.service.completeLesson(id, lessonId);
      
      res.json({
        success: true,
        data: progress,
        message: 'Lesson completed successfully'
      });
    } catch (error) {
      console.error(`Error in UserProgressController.completeLesson(${req.params.id}):`, error);
      
      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Complete a quiz
   */
  public completeQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { quizId, score } = req.body;
      
      if (!quizId) {
        res.status(400).json({
          success: false,
          error: 'Missing quizId in request body'
        });
        return;
      }
      
      if (score === undefined || typeof score !== 'number' || score < 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid score in request body. Must be a non-negative number'
        });
        return;
      }
      
      const progress = await this.service.completeQuiz(id, quizId, score);
      
      res.json({
        success: true,
        data: progress,
        message: 'Quiz completed successfully'
      });
    } catch (error) {
      console.error(`Error in UserProgressController.completeQuiz(${req.params.id}):`, error);
      
      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };
}
