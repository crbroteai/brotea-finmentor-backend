import { Request, Response } from 'express';
import { IUserProfileService } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * User Profile Controller
 */
export class UserProfileController {
  constructor(private service: IUserProfileService) {}

  /**
   * Get all user profiles
   */
  public getAllProfiles = async (_req: Request, res: Response): Promise<void> => {
    try {
      const profiles = await this.service.getAllProfiles();
      
      res.json({
        success: true,
        data: profiles
      });
    } catch (error) {
      console.error('Error in UserProfileController.getAllProfiles:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get a user profile by ID
   */
  public getProfileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const profile = await this.service.getProfileById(id);
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error(`Error in UserProfileController.getProfileById(${req.params.id}):`, error);
      
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
   * Get a user profile by user ID
   */
  public getProfileByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const profile = await this.service.getProfileByUserId(userId);
      
      if (!profile) {
        res.status(404).json({
          success: false,
          error: `User profile for user ${userId} not found`
        });
        return;
      }
      
      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error(`Error in UserProfileController.getProfileByUserId(${req.params.userId}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Create a new user profile
   */
  public createProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profile = await this.service.createProfile(req.body);
      
      res.status(201).json({
        success: true,
        data: profile,
        message: 'User profile created successfully'
      });
    } catch (error) {
      console.error('Error in UserProfileController.createProfile:', error);
      
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
   * Update a user profile
   */
  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const profile = await this.service.updateProfile(id, req.body);
      
      res.json({
        success: true,
        data: profile,
        message: 'User profile updated successfully'
      });
    } catch (error) {
      console.error(`Error in UserProfileController.updateProfile(${req.params.id}):`, error);
      
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
