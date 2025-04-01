import { INFTCertificateRepository, NFTCertificate } from '../finmentor.types';

/**
 * Mock implementation of the NFTCertificateRepository
 */
export class NFTCertificateRepository implements INFTCertificateRepository {
  private certificates: NFTCertificate[] = [
    {
      tokenId: 'nft-1',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      moduleId: 'mod-1',
      userId: 'user-456',
      metadataURI: 'ipfs://QmXyZ123456789',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      fechaEmision: '2024-03-05T10:30:00Z',
      nivel: 1,
      atributos: {
        title: 'Fundamentos de Finanzas Personales',
        score: 85,
        issuer: 'FinMentor AI',
        skills: ['presupuesto', 'ahorro', 'inversión básica']
      }
    },
    {
      tokenId: 'nft-2',
      walletAddress: '0x0987654321fedcba0987654321fedcba09876543',
      moduleId: 'mod-2',
      userId: 'user-789',
      metadataURI: 'ipfs://QmAbC987654321',
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      fechaEmision: '2024-03-10T14:45:00Z',
      nivel: 2,
      atributos: {
        title: 'Introducción a las Criptomonedas',
        score: 92,
        issuer: 'FinMentor AI',
        skills: ['blockchain', 'bitcoin', 'ethereum', 'wallets']
      }
    }
  ];

  /**
   * Find all NFT certificates
   */
  async findAll(): Promise<NFTCertificate[]> {
    return [...this.certificates];
  }

  /**
   * Find an NFT certificate by token ID
   */
  async findByTokenId(tokenId: string): Promise<NFTCertificate | null> {
    const certificate = this.certificates.find(c => c.tokenId === tokenId);
    return certificate ? { ...certificate } : null;
  }

  /**
   * Find NFT certificates by wallet address
   */
  async findByWalletAddress(walletAddress: string): Promise<NFTCertificate[]> {
    return this.certificates
      .filter(c => c.walletAddress.toLowerCase() === walletAddress.toLowerCase())
      .map(c => ({ ...c }));
  }

  /**
   * Find NFT certificates by user ID
   */
  async findByUserId(userId: string): Promise<NFTCertificate[]> {
    return this.certificates
      .filter(c => c.userId === userId)
      .map(c => ({ ...c }));
  }

  /**
   * Find NFT certificates by module ID
   */
  async findByModuleId(moduleId: string): Promise<NFTCertificate[]> {
    return this.certificates
      .filter(c => c.moduleId === moduleId)
      .map(c => ({ ...c }));
  }

  /**
   * Create a new NFT certificate
   */
  async create(certificate: Omit<NFTCertificate, 'tokenId'>): Promise<NFTCertificate> {
    const newCertificate: NFTCertificate = {
      tokenId: `nft-${this.certificates.length + 1}`,
      ...certificate
    };

    this.certificates.push(newCertificate);
    return { ...newCertificate };
  }
}
