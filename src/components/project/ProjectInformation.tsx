import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Calendar, Building, Users, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProjectStore } from '../../lib/store';
import { auth } from '../../lib/firebase';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function ProjectInformation() {
  const navigate = useNavigate();
  const addProject = useProjectStore((state) => state.addProject);
  const [userInitial, setUserInitial] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    day: '',
    endDate: '',
    startDate: '',
    contractor: '',
    consultant: ''
  });

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(formData);
    navigate('/project/actions');
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-brand-navy"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-brand-navy">Project Information</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-brand-navy hover:text-opacity-70 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go to home"
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg">
                {userInitial || <UserIcon className="w-5 h-5" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-brand-navy">
                  Project Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                    placeholder="Enter project name"
                    required
                  />
                </div>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="date" className="block text-sm font-medium text-brand-navy">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="day" className="block text-sm font-medium text-brand-navy">
                    Day
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="day"
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="e.g., Monday"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="startDate" className="block text-sm font-medium text-brand-navy">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="endDate" className="block text-sm font-medium text-brand-navy">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contractor and Consultant */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contractor" className="block text-sm font-medium text-brand-navy">
                    Contractor
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="contractor"
                      name="contractor"
                      value={formData.contractor}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="Enter contractor name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="consultant" className="block text-sm font-medium text-brand-navy">
                    Consultant
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="consultant"
                      name="consultant"
                      value={formData.consultant}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="Enter consultant name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                >
                  Continue to Project Actions
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}