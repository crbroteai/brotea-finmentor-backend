import {Request, Response} from "express";
import {FinancialTerm, IEducationalContentService} from "../finmentor.types";
import {NotFoundError} from "@Domain/errors/NotFoundError";

/**
 * Educational Content Controller
 */
export class EducationalContentController {
  constructor(private service: IEducationalContentService) {}

  /**
   * Get all educational modules
   */
  public getAllModules = async (_req: Request, res: Response): Promise<void> => {
    try {
      const modules = await this.service.getAllModules();

      res.json({
        success: true,
        data: modules,
      });
    } catch (error) {
      console.error("Error in EducationalContentController.getAllModules:", error);

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get an educational module by ID
   */
  public getModuleById = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const module = await this.service.getModuleById(id);

      res.json({
        success: true,
        data: module,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getModuleById(${req.params.id}):`,
        error,
      );

      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get educational modules by category
   */
  public getModulesByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const {category} = req.params;
      const modules = await this.service.getModulesByCategory(category);

      res.json({
        success: true,
        data: modules,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getModulesByCategory(${req.params.category}):`,
        error,
      );

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get educational modules by web type
   */
  public getModulesByWebType = async (req: Request, res: Response): Promise<void> => {
    try {
      const {webType} = req.params;

      if (webType !== "web2" && webType !== "web3") {
        res.status(400).json({
          success: false,
          error: 'Invalid web type. Must be "web2" or "web3"',
        });
        return;
      }

      const modules = await this.service.getModulesByWebType(webType);

      res.json({
        success: true,
        data: modules,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getModulesByWebType(${req.params.webType}):`,
        error,
      );

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get educational modules by difficulty level
   */
  public getModulesByDifficulty = async (req: Request, res: Response): Promise<void> => {
    try {
      const {difficulty} = req.params;
      const difficultyLevel = parseInt(difficulty);

      if (isNaN(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 5) {
        res.status(400).json({
          success: false,
          error: "Invalid difficulty level. Must be a number between 1 and 5",
        });
        return;
      }

      const modules = await this.service.getModulesByDifficulty(difficultyLevel);

      res.json({
        success: true,
        data: modules,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getModulesByDifficulty(${req.params.difficulty}):`,
        error,
      );

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Create a new educational module
   */
  public createModule = async (req: Request, res: Response): Promise<void> => {
    try {
      const module = await this.service.createModule(req.body);

      res.status(201).json({
        success: true,
        data: module,
        message: "Educational module created successfully",
      });
    } catch (error) {
      console.error("Error in EducationalContentController.createModule:", error);

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get all financial terms
   */
  public getAllTerms = async (_req: Request, res: Response): Promise<void> => {
    try {
      const terms = await this.service.getAllTerms();

      res.json({
        success: true,
        data: terms,
      });
    } catch (error) {
      console.error("Error in EducationalContentController.getAllTerms:", error);

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get a financial term by ID
   */
  public getTermById = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const term = await this.service.getTermById(id);

      res.json({
        success: true,
        data: term,
      });
    } catch (error) {
      console.error(`Error in EducationalContentController.getTermById(${req.params.id}):`, error);

      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get financial terms by category
   */
  public getTermsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const {category} = req.params;
      const terms = await this.service.getTermsByCategory(category);

      res.json({
        success: true,
        data: terms,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getTermsByCategory(${req.params.category}):`,
        error,
      );

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Get financial terms by web type
   */
  public getTermsByWebType = async (req: Request, res: Response): Promise<void> => {
    try {
      const {webType} = req.params;

      if (webType !== "web2" && webType !== "web3") {
        res.status(400).json({
          success: false,
          error: 'Invalid web type. Must be "web2" or "web3"',
        });
        return;
      }

      const terms = await this.service.getTermsByWebType(webType);

      res.json({
        success: true,
        data: terms,
      });
    } catch (error) {
      console.error(
        `Error in EducationalContentController.getTermsByWebType(${req.params.webType}):`,
        error,
      );

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };

  /**
   * Create a new financial term
   */
  public createTerm = async (req: Request, res: Response): Promise<void> => {
    try {
      const {segments, session_id} = req.body;
      let content = "";
      let in_note = false;
      let term: unknown;

      for (const segment of segments) {
        const lowerText = segment.text.toLowerCase();
        if (lowerText.includes("start note") && !in_note) {
          in_note = true;
          content = ""; // Reset content when starting a new note
        }

        if (in_note) {
          content += " " + segment.text;
        }

        if (lowerText.includes("stop and save") && in_note) {
          in_note = false;
          const finalContent = content.trim();
          console.log("OK, HERE WE GOOOO!", finalContent);

          console.log(content, session_id);

          // TODO: Create a new term from finalContent string
          term = await this.service.createTerm(term as unknown as FinancialTerm);

          content = "";
        }
      }

      res.status(201).json({
        success: true,
        data: term,
        message: "Financial term created successfully",
      });
    } catch (error) {
      console.error("Error in EducationalContentController.createTerm:", error);

      res.status(500).json({
        success: false,
        error: "Error interno del servidor",
      });
    }
  };
}
