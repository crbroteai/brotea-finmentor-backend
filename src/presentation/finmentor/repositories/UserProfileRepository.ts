import { IUserProfileRepository, UserProfile } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * Mock implementation of the UserProfileRepository
 */
export class UserProfileRepository implements IUserProfileRepository {
  private profiles: UserProfile[] = [
    {
      id: '1',
      userId: 'user-123',
      nivelWeb2: 3,
      nivelWeb3: 1,
      areasInteres: ['investing', 'savings', 'crypto'],
      historialTerminos: ['ETF', 'DeFi', 'staking', 'compound interest'],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'user-456',
      nivelWeb2: 4,
      nivelWeb3: 2,
      areasInteres: ['trading', 'crypto', 'NFTs'],
      historialTerminos: ['liquidity pool', 'yield farming', 'market cap', 'bull market'],
      lastUpdated: new Date().toISOString(),
    },
  ];

  /**
   * Find all user profiles
   */
  async findAll(): Promise<UserProfile[]> {
    return [...this.profiles];
  }

  /**
   * Find a user profile by ID
   */
  async findById(id: string): Promise<UserProfile | null> {
    const profile = this.profiles.find(p => p.id === id);
    return profile ? { ...profile } : null;
  }

  /**
   * Find a user profile by user ID
   */
  async findByUserId(userId: string): Promise<UserProfile | null> {
    const profile = this.profiles.find(p => p.userId === userId);
    return profile ? { ...profile } : null;
  }

  /**
   * Create a new user profile
   */
  async create(profile: Omit<UserProfile, 'id'>): Promise<UserProfile> {
    const newProfile: UserProfile = {
      id: (this.profiles.length + 1).toString(),
      ...profile,
      lastUpdated: new Date().toISOString(),
    };

    this.profiles.push(newProfile);
    return { ...newProfile };
  }

  /**
   * Update a user profile
   */
  async update(id: string, profile: Partial<UserProfile>): Promise<UserProfile | null> {
    const index = this.profiles.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedProfile: UserProfile = {
      ...this.profiles[index],
      ...profile,
      lastUpdated: new Date().toISOString(),
    };

    this.profiles[index] = updatedProfile;
    return { ...updatedProfile };
  }
}
