import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, Hammer, Construction, Ruler, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';

const menuItems = [
  {
    id: 'white-concrete',
    title: 'White Concrete',
    description: 'Concrete mixture and application specifications',
    icon: Boxes,
    color: 'bg-emerald-100 text-emerald-600',
    path: '/project/basics/white-concrete'
  },
  {
    id: 'carpentry',
    title: 'Reinforced Foundation Carpentry',
    description: 'Wooden framework and support structures',
    icon: Hammer,
    color: 'bg-amber-100 text-amber-600',
    path: '/project/basics/carpentry'
  },
  {
    id: 'reinforcement',
    title: 'Foundation Reinforcement Steel',
    description: 'Steel reinforcement specifications and layout',
    icon: Construction,
    color: 'bg-blue-100 text-blue-600',
    path: '/project/basics/reinforcement'
  },
  {
    id: 'casting',
    title: 'Casting Work',
    description: 'Concrete pouring and finishing procedures',
    icon: Ruler,
    color: 'bg-purple-100 text-purple-600',
    path: '/project/basics/casting'
  }
];

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

export function BasicsScreen() {
  const navigate = useNavigate();
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/project/actions')}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
                aria-label="Back to actions"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-white">The Basics</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg">
              {userInitial || <UserIcon className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => navigate(item.path)}
              className="group relative overflow-hidden bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
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