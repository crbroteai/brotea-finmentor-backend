import { IUserProgressRepository, UserProgress } from '../finmentor.types';

/**
 * Mock implementation of the UserProgressRepository
 */
export class UserProgressRepository implements IUserProgressRepository {
  private progress: UserProgress[] = [
    {
      id: 'prog-1',
      userId: 'user-123',
      moduleId: 'mod-1',
      porcentajeCompletado: 75,
      ultimoAcceso: '2024-03-10T15:30:00Z',
      leccionesCompletadas: ['lec-1-1'],
      quizzesCompletados: [],
      puntosTotales: 0
    },
    {
      id: 'prog-2',
      userId: 'user-123',
      moduleId: 'mod-2',
      porcentajeCompletado: 25,
      ultimoAcceso: '2024-03-12T10:15:00Z',
      leccionesCompletadas: ['lec-2-1'],
      quizzesCompletados: [],
      puntosTotales: 0
    },
    {
      id: 'prog-3',
      userId: 'user-456',
      moduleId: 'mod-1',
      porcentajeCompletado: 100,
      ultimoAcceso: '2024-03-05T09:45:00Z',
      leccionesCompletadas: ['lec-1-1', 'lec-1-2'],
      quizzesCompletados: ['quiz-1'],
      puntosTotales: 85
    }
  ];

  /**
   * Find all progress records
   */
  async findAll(): Promise<UserProgress[]> {
    return [...this.progress];
  }

  /**
   * Find a progress record by ID
   */
  async findById(id: string): Promise<UserProgress | null> {
    const progress = this.progress.find(p => p.id === id);
    return progress ? { ...progress } : null;
  }

  /**
   * Find progress records by user ID
   */
  async findByUserId(userId: string): Promise<UserProgress[]> {
    return this.progress.filter(p => p.userId === userId).map(p => ({ ...p }));
  }

  /**
   * Find a progress record by user ID and module ID
   */
  async findByUserIdAndModuleId(userId: string, moduleId: string): Promise<UserProgress | null> {
    const progress = this.progress.find(p => p.userId === userId && p.moduleId === moduleId);
    return progress ? { ...progress } : null;
  }

  /**
   * Create a new progress record
   */
  async create(progress: Omit<UserProgress, 'id'>): Promise<UserProgress> {
    const newProgress: UserProgress = {
      id: `prog-${this.progress.length + 1}`,
      ...progress
    };

    this.progress.push(newProgress);
    return { ...newProgress };
  }

  /**
   * Update a progress record
   */
  async update(id: string, progress: Partial<UserProgress>): Promise<UserProgress | null> {
    const index = this.progress.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedProgress: UserProgress = {
      ...this.progress[index],
      ...progress,
      ultimoAcceso: new Date().toISOString()
    };

    this.progress[index] = updatedProgress;
    return { ...updatedProgress };
  }

  /**
   * Complete a lesson
   */
  async completeLesson(id: string, lessonId: string): Promise<UserProgress | null> {
    const index = this.progress.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    // Check if lesson is already completed
    if (this.progress[index].leccionesCompletadas.includes(lessonId)) {
      return { ...this.progress[index] };
    }

    // Add lesson to completed lessons
    const updatedProgress: UserProgress = {
      ...this.progress[index],
      leccionesCompletadas: [...this.progress[index].leccionesCompletadas, lessonId],
      ultimoAcceso: new Date().toISOString()
    };

    // Update completion percentage (simplified calculation)
    // In a real app, you would get the total lessons count from the module
    const totalLessons = 2; // Assuming 2 lessons per module for this example
    const completedLessons = updatedProgress.leccionesCompletadas.length;
    updatedProgress.porcentajeCompletado = Math.min(
      Math.round((completedLessons / totalLessons) * 100),
      100
    );

    this.progress[index] = updatedProgress;
    return { ...updatedProgress };
  }

  /**
   * Complete a quiz
   */
  async completeQuiz(id: string, quizId: string, score: number): Promise<UserProgress | null> {
    const index = this.progress.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    // Check if quiz is already completed
    if (this.progress[index].quizzesCompletados.includes(quizId)) {
      return { ...this.progress[index] };
    }

    // Add quiz to completed quizzes and update points
    const updatedProgress: UserProgress = {
      ...this.progress[index],
      quizzesCompletados: [...this.progress[index].quizzesCompletados, quizId],
      puntosTotales: this.progress[index].puntosTotales + score,
      ultimoAcceso: new Date().toISOString()
    };

    // Update completion percentage if all lessons and quizzes are completed
    if (updatedProgress.leccionesCompletadas.length === 2 && 
        updatedProgress.quizzesCompletados.length === 1) {
      updatedProgress.porcentajeCompletado = 100;
    }

    this.progress[index] = updatedProgress;
    return { ...updatedProgress };
  }
}
