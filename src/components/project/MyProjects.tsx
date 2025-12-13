import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Building2, Home, User as UserIcon } from 'lucide-react';
import { useProjectStore } from '../../lib/store';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export function MyProjects() {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjectStore();
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white shadow dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-brand-navy dark:text-white dark:hover:bg-slate-700"
                aria-label="Back to dashboard"
              >
                <Home className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-brand-navy dark:text-white">My Projects</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg dark:bg-brand-teal/80">
              {userInitial || <UserIcon className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new project.</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/project/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-teal hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
                >
                  Create new project
                </button>
              </div>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={() => navigate(`/project/actions`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-brand-teal bg-opacity-10 rounded-xl flex items-center justify-center dark:bg-brand-teal/20">
                        <Building2 className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-brand-navy dark:text-white">{project.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-red-500/10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <ArrowRight className="w-5 h-5 text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}