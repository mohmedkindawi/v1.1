import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ProjectStore, Project } from './types';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, query, orderBy, FirestoreError } from 'firebase/firestore';
import { db } from './firebase';

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,
      
      setLoading: (state: boolean) => set({ loading: state }),
      setError: (error: string | null) => set({ error }),

      // Initialize projects from Firestore
      initializeProjects: async () => {
        try {
          set({ loading: true, error: null });
          const projectsRef = collection(db, 'projects');
          const q = query(projectsRef, orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          
          const projects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Project[];
          
          set({ projects, loading: false });
        } catch (error: unknown) {
          const message = error instanceof FirestoreError ? error.message : 'Failed to fetch projects';
          set({ error: message, loading: false });
        }
      },

      // Add project with Firestore integration
      addProject: async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
        try {
          set({ loading: true, error: null });
          const project: Omit<Project, 'id'> = {
            ...projectData,
            createdAt: Date.now(),
          };

          const docRef = await addDoc(collection(db, 'projects'), project);
          const newProject = { ...project, id: docRef.id };
          
          set((state) => ({
            projects: [...state.projects, newProject],
            loading: false
          }));
        } catch (error: unknown) {
          const message = error instanceof FirestoreError ? error.message : 'Failed to add project';
          set({ error: message, loading: false });
        }
      },

      // Delete project with Firestore integration
      deleteProject: async (id: string) => {
        try {
          set({ loading: true, error: null });
          await deleteDoc(doc(db, 'projects', id));
          
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
            loading: false
          }));
        } catch (error: unknown) {
          const message = error instanceof FirestoreError ? error.message : 'Failed to delete project';
          set({ error: message, loading: false });
        }
      },

      // Get project by ID
      getProject: (id: string) => {
        return get().projects.find((project) => project.id === id);
      },

      // Update project with Firestore integration
      updateProject: async (id: string, updates: Partial<Omit<Project, 'id'>>) => {
        try {
          set({ loading: true, error: null });
          const projectRef = doc(db, 'projects', id);
          await updateDoc(projectRef, updates);
          
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === id ? { ...project, ...updates } : project
            ),
            loading: false
          }));
        } catch (error: unknown) {
          const message = error instanceof FirestoreError ? error.message : 'Failed to update project';
          set({ error: message, loading: false });
        }
      },
    }),
    {
      name: 'project-storage',
    }
  )
);