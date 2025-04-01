import { Router } from 'express';
import { 
  UserProfileController, 
  EducationalContentController, 
  UserProgressController, 
  NFTCertificateController 
} from '../controllers';
import { 
  UserProfileService, 
  EducationalContentService, 
  UserProgressService, 
  NFTCertificateService 
} from '../services';
import { 
  UserProfileRepository, 
  EducationalContentRepository, 
  UserProgressRepository, 
  NFTCertificateRepository 
} from '../repositories';

/**
 * FinMentor AI Routes
 */
export class FinMentorRoutes {
  public routes: Router;
  public name: string;

  constructor() {
    this.routes = Router();
    this.name = 'FinMentor';
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Initialize repositories
    const userProfileRepository = new UserProfileRepository();
    const educationalContentRepository = new EducationalContentRepository();
    const userProgressRepository = new UserProgressRepository();
    const nftCertificateRepository = new NFTCertificateRepository();

    // Initialize services
    const userProfileService = new UserProfileService(userProfileRepository);
    const educationalContentService = new EducationalContentService(educationalContentRepository);
    const userProgressService = new UserProgressService(userProgressRepository);
    const nftCertificateService = new NFTCertificateService(nftCertificateRepository);

    // Initialize controllers
    const userProfileController = new UserProfileController(userProfileService);
    const educationalContentController = new EducationalContentController(educationalContentService);
    const userProgressController = new UserProgressController(userProgressService);
    const nftCertificateController = new NFTCertificateController(nftCertificateService);

    // User Profile Routes
    this.routes.get('/finmentor/profiles', userProfileController.getAllProfiles);
    this.routes.get('/finmentor/profiles/:id', userProfileController.getProfileById);
    this.routes.get('/finmentor/profiles/user/:userId', userProfileController.getProfileByUserId);
    this.routes.post('/finmentor/profiles', userProfileController.createProfile);
    this.routes.put('/finmentor/profiles/:id', userProfileController.updateProfile);

    // Educational Content Routes - Modules
    this.routes.get('/finmentor/modules', educationalContentController.getAllModules);
    this.routes.get('/finmentor/modules/:id', educationalContentController.getModuleById);
    this.routes.get('/finmentor/modules/category/:category', educationalContentController.getModulesByCategory);
    this.routes.get('/finmentor/modules/web-type/:webType', educationalContentController.getModulesByWebType);
    this.routes.get('/finmentor/modules/difficulty/:difficulty', educationalContentController.getModulesByDifficulty);
    this.routes.post('/finmentor/modules', educationalContentController.createModule);

    // Educational Content Routes - Terms
    this.routes.get('/finmentor/terms', educationalContentController.getAllTerms);
    this.routes.get('/finmentor/terms/:id', educationalContentController.getTermById);
    this.routes.get('/finmentor/terms/category/:category', educationalContentController.getTermsByCategory);
    this.routes.get('/finmentor/terms/web-type/:webType', educationalContentController.getTermsByWebType);
    this.routes.post('/finmentor/terms', educationalContentController.createTerm);

    // User Progress Routes
    this.routes.get('/finmentor/progress', userProgressController.getAllProgress);
    this.routes.get('/finmentor/progress/:id', userProgressController.getProgressById);
    this.routes.get('/finmentor/progress/user/:userId', userProgressController.getProgressByUserId);
    this.routes.get('/finmentor/progress/user/:userId/module/:moduleId', userProgressController.getProgressByUserIdAndModuleId);
    this.routes.post('/finmentor/progress', userProgressController.createProgress);
    this.routes.put('/finmentor/progress/:id', userProgressController.updateProgress);
    this.routes.post('/finmentor/progress/:id/complete-lesson', userProgressController.completeLesson);
    this.routes.post('/finmentor/progress/:id/complete-quiz', userProgressController.completeQuiz);

    // NFT Certificate Routes
    this.routes.get('/finmentor/certificates', nftCertificateController.getAllCertificates);
    this.routes.get('/finmentor/certificates/:tokenId', nftCertificateController.getCertificateByTokenId);
    this.routes.get('/finmentor/certificates/wallet/:walletAddress', nftCertificateController.getCertificatesByWalletAddress);
    this.routes.get('/finmentor/certificates/user/:userId', nftCertificateController.getCertificatesByUserId);
    this.routes.get('/finmentor/certificates/module/:moduleId', nftCertificateController.getCertificatesByModuleId);
    this.routes.post('/finmentor/certificates', nftCertificateController.createCertificate);
  }
}
