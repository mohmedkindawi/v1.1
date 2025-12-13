export interface Project {
  id: string;
  name: string;
  date: string;
  day: string;
  startDate: string;
  endDate: string;
  contractor: string;
  consultant: string;
  createdAt: number;
}

export interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  setLoading: (state: boolean) => void;
  setError: (error: string | null) => void;
  initializeProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Project | undefined;
  updateProject: (id: string, updates: Partial<Omit<Project, 'id'>>) => Promise<void>;
}