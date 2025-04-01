import { Request, Response } from 'express';
import { INFTCertificateService } from '../finmentor.types';
import { NotFoundError } from '@Domain/errors/NotFoundError';

/**
 * NFT Certificate Controller
 */
export class NFTCertificateController {
  constructor(private service: INFTCertificateService) {}

  /**
   * Get all NFT certificates
   */
  public getAllCertificates = async (_req: Request, res: Response): Promise<void> => {
    try {
      const certificates = await this.service.getAllCertificates();
      
      res.json({
        success: true,
        data: certificates
      });
    } catch (error) {
      console.error('Error in NFTCertificateController.getAllCertificates:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get an NFT certificate by token ID
   */
  public getCertificateByTokenId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tokenId } = req.params;
      const certificate = await this.service.getCertificateByTokenId(tokenId);
      
      res.json({
        success: true,
        data: certificate
      });
    } catch (error) {
      console.error(`Error in NFTCertificateController.getCertificateByTokenId(${req.params.tokenId}):`, error);
      
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
   * Get NFT certificates by wallet address
   */
  public getCertificatesByWalletAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const { walletAddress } = req.params;
      const certificates = await this.service.getCertificatesByWalletAddress(walletAddress);
      
      res.json({
        success: true,
        data: certificates
      });
    } catch (error) {
      console.error(`Error in NFTCertificateController.getCertificatesByWalletAddress(${req.params.walletAddress}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get NFT certificates by user ID
   */
  public getCertificatesByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const certificates = await this.service.getCertificatesByUserId(userId);
      
      res.json({
        success: true,
        data: certificates
      });
    } catch (error) {
      console.error(`Error in NFTCertificateController.getCertificatesByUserId(${req.params.userId}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Get NFT certificates by module ID
   */
  public getCertificatesByModuleId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { moduleId } = req.params;
      const certificates = await this.service.getCertificatesByModuleId(moduleId);
      
      res.json({
        success: true,
        data: certificates
      });
    } catch (error) {
      console.error(`Error in NFTCertificateController.getCertificatesByModuleId(${req.params.moduleId}):`, error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };

  /**
   * Create a new NFT certificate
   */
  public createCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate required fields
      const { walletAddress, moduleId, userId } = req.body;
      
      if (!walletAddress || !moduleId || !userId) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: walletAddress, moduleId, and userId are required'
        });
        return;
      }
      
      // In a real implementation, we would verify that the user has completed the module
      // before issuing a certificate
      
      const certificate = await this.service.createCertificate({
        ...req.body,
        fechaEmision: new Date().toISOString()
      });
      
      res.status(201).json({
        success: true,
        data: certificate,
        message: 'NFT certificate created successfully'
      });
    } catch (error) {
      console.error('Error in NFTCertificateController.createCertificate:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };
}
