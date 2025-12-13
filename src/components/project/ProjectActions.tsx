import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TestTube, 
  Shovel, 
  Layers, 
  FileText, 
  ArrowLeft, 
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { useTranslation } from 'react-i18next';

// Animation variants for menu items
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

export function ProjectActions() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('basics');
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  const menuItems = [
    {
      id: 'basics',
      title: t('projectActions.menu.basics.title'),
      description: t('projectActions.menu.basics.description'),
      icon: Building2,
      color: 'bg-emerald-100 text-emerald-600',
      path: '/project/basics'
    },
    {
      id: 'mayor-walls',
      title: t('projectActions.menu.mayorWalls.title'),
      description: t('projectActions.menu.mayorWalls.description'),
      icon: Layers,
      color: 'bg-blue-100 text-blue-600',
      path: '/project/walls'
    },
    {
      id: 'tests',
      title: t('projectActions.menu.tests.title'),
      description: t('projectActions.menu.tests.description'),
      icon: TestTube,
      color: 'bg-purple-100 text-purple-600',
      path: '/project/tests'
    },
    {
      id: 'excavation',
      title: t('projectActions.menu.excavation.title'),
      description: t('projectActions.menu.excavation.description'),
      icon: Shovel,
      color: 'bg-amber-100 text-amber-600',
      path: '/project/excavation'
    },
    {
      id: 'ceilings',
      title: t('projectActions.menu.ceilings.title'),
      description: t('projectActions.menu.ceilings.description'),
      icon: Building2,
      color: 'bg-rose-100 text-rose-600',
      path: '/project/ceilings'
    },
    {
      id: 'reports',
      title: t('projectActions.menu.reports.title'),
      description: t('projectActions.menu.reports.description'),
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600',
      path: '/project/reports'
    }
  ];

  const handleMenuItemClick = (item: (typeof menuItems)[0]) => {
    setActiveSection(item.id);
    if (item.id === 'excavation') {
      navigate('/project/excavation');
    } else {
      navigate(item.path);
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
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-brand-navy dark:text-white">{t('projectActions.title')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-brand-navy hover:text-opacity-70 hover:bg-gray-100 rounded-lg transition-colors dark:text-white dark:hover:bg-slate-700"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/home')}
                className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg dark:bg-brand-teal/80"
                aria-label="Go to home"
              >
                {userInitial || <UserIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => handleMenuItemClick(item)}
              className={`group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left dark:bg-slate-800 dark:hover:bg-slate-700 ${
                activeSection === item.id ? 'ring-2 ring-brand-teal' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              aria-label={`Select ${item.title} section`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center dark:bg-opacity-20`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-brand-navy mb-1 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}