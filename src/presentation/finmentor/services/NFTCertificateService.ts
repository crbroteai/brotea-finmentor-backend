import { INFTCertificateRepository, INFTCertificateService, NFTCertificate } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * Implementation of the NFTCertificateService
 */
export class NFTCertificateService implements INFTCertificateService {
  constructor(private repository: INFTCertificateRepository) {}

  /**
   * Get all NFT certificates
   */
  async getAllCertificates(): Promise<NFTCertificate[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error in NFTCertificateService.getAllCertificates:', error);
      throw error;
    }
  }

  /**
   * Get an NFT certificate by token ID
   */
  async getCertificateByTokenId(tokenId: string): Promise<NFTCertificate> {
    try {
      const certificate = await this.repository.findByTokenId(tokenId);
      
      if (!certificate) {
        throw new NotFoundError(`NFT certificate with token ID ${tokenId} not found`);
      }
      
      return certificate;
    } catch (error) {
      console.error(`Error in NFTCertificateService.getCertificateByTokenId(${tokenId}):`, error);
      throw error;
    }
  }

  /**
   * Get NFT certificates by wallet address
   */
  async getCertificatesByWalletAddress(walletAddress: string): Promise<NFTCertificate[]> {
    try {
      return await this.repository.findByWalletAddress(walletAddress);
    } catch (error) {
      console.error(`Error in NFTCertificateService.getCertificatesByWalletAddress(${walletAddress}):`, error);
      throw error;
    }
  }

  /**
   * Get NFT certificates by user ID
   */
  async getCertificatesByUserId(userId: string): Promise<NFTCertificate[]> {
    try {
      return await this.repository.findByUserId(userId);
    } catch (error) {
      console.error(`Error in NFTCertificateService.getCertificatesByUserId(${userId}):`, error);
      throw error;
    }
  }

  /**
   * Get NFT certificates by module ID
   */
  async getCertificatesByModuleId(moduleId: string): Promise<NFTCertificate[]> {
    try {
      return await this.repository.findByModuleId(moduleId);
    } catch (error) {
      console.error(`Error in NFTCertificateService.getCertificatesByModuleId(${moduleId}):`, error);
      throw error;
    }
  }

  /**
   * Create a new NFT certificate
   */
  async createCertificate(certificate: Omit<NFTCertificate, 'tokenId'>): Promise<NFTCertificate> {
    try {
      // In a real implementation, this would interact with a blockchain
      // to mint the NFT and get the token ID and transaction hash
      
      // For now, we'll just create a mock certificate
      return await this.repository.create({
        ...certificate,
        fechaEmision: certificate.fechaEmision || new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in NFTCertificateService.createCertificate:', error);
      throw error;
    }
  }
}
