import { IUserProfileRepository, IUserProfileService, UserProfile } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * Implementation of the UserProfileService
 */
export class UserProfileService implements IUserProfileService {
  constructor(private repository: IUserProfileRepository) {}

  /**
   * Get all user profiles
   */
  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error in UserProfileService.getAllProfiles:', error);
      throw error;
    }
  }

  /**
   * Get a user profile by ID
   */
  async getProfileById(id: string): Promise<UserProfile> {
    try {
      const profile = await this.repository.findById(id);
      
      if (!profile) {
        throw new NotFoundError(`User profile with ID ${id} not found`);
      }
      
      return profile;
    } catch (error) {
      console.error(`Error in UserProfileService.getProfileById(${id}):`, error);
      throw error;
    }
  }

  /**
   * Get a user profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<UserProfile | null> {
    try {
      return await this.repository.findByUserId(userId);
    } catch (error) {
      console.error(`Error in UserProfileService.getProfileByUserId(${userId}):`, error);
      throw error;
    }
  }

  /**
   * Create a new user profile
   */
  async createProfile(profile: Omit<UserProfile, 'id' | 'lastUpdated'>): Promise<UserProfile> {
    try {
      // Check if profile already exists for this user
      const existingProfile = await this.repository.findByUserId(profile.userId);
      
      if (existingProfile) {
        throw new Error(`User profile already exists for user ${profile.userId}`);
      }
      
      return await this.repository.create({
        ...profile,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in UserProfileService.createProfile:', error);
      throw error;
    }
  }

  /**
   * Update a user profile
   */
  async updateProfile(id: string, profile: Partial<Omit<UserProfile, 'id' | 'lastUpdated'>>): Promise<UserProfile> {
    try {
      const updatedProfile = await this.repository.update(id, {
        ...profile,
        lastUpdated: new Date().toISOString()
      });
      
      if (!updatedProfile) {
        throw new NotFoundError(`User profile with ID ${id} not found`);
      }
      
      return updatedProfile;
    } catch (error) {
      console.error(`Error in UserProfileService.updateProfile(${id}):`, error);
      throw error;
    }
  }
}
