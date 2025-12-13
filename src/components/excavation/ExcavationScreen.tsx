import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shovel, Layers, ArrowRight } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

// Define the checklist data structure
interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

// Define the checklist data
const excavationChecklists: ChecklistSection[] = [
  {
    id: 'excavation-works',
    title: 'Excavation Works',
    items: [
      { id: 1, text: 'Verify approval of materials used in the item\'s execution and inspect equipment before starting work.', checked: false },
      { id: 2, text: 'Confirm approval of workshop drawings required for execution and review site boundaries.', checked: false },
      { id: 3, text: 'Ensure the execution method for the item is approved.', checked: false },
      { id: 4, text: 'Verify required tests are conducted per specifications, and review soil reports/groundwater analysis.', checked: false },
      { id: 5, text: 'Confirm handover of foundational items supporting the current item.', checked: false },
      { id: 6, text: 'Ensure the site is handed over without obstructions.', checked: false },
      { id: 7, text: 'Confirm site cleanliness before starting work.', checked: false },
      { id: 8, text: 'Review design drawings, technical specifications, other documents, and the execution program.', checked: false },
      { id: 9, text: 'Verify occupational safety conditions for item handover.', checked: false },
      { id: 10, text: 'Ensure the ground is free of water pipes, electrical cables, and gas connections.', checked: false },
      { id: 11, text: 'Confirm excavation does not affect adjacent structures.', checked: false },
      { id: 12, text: 'Verify removal of waste generated during execution.', checked: false },
      { id: 13, text: 'Designate storage areas before excavation begins.', checked: false },
    ]
  },
  {
    id: 'excavation-handover',
    title: 'Excavation Works Handover Checklist',
    items: [
      { id: 1, text: 'Verify coordinates of excavation boundaries match building boundaries.', checked: false },
      { id: 2, text: 'Review foundation level and excavation depth against the soil report.', checked: false },
      { id: 3, text: 'Confirm foundation level aligns with the design.', checked: false },
      { id: 4, text: 'Check cleanliness, evenness, and disinfection of the excavation base and sides.', checked: false },
      { id: 5, text: 'Ensure foundation soil type matches the soil report.', checked: false },
      { id: 6, text: 'If excavation depth exceeds requirements, confirm backfilling with plain concrete to the specified level.', checked: false },
    ]
  }
];

const backfillingChecklists: ChecklistSection[] = [
  {
    id: 'backfilling',
    title: 'Backfilling',
    items: [
      { id: 1, text: 'Verify approval of materials used for execution and inspect equipment/machinery before work begins.', checked: false },
      { id: 2, text: 'Confirm approval of workshop drawings required for execution.', checked: false },
      { id: 3, text: 'Ensure the execution method for the item is approved.', checked: false },
      { id: 4, text: 'Verify required tests per specifications, and review soil reports/compaction tests.', checked: false },
      { id: 5, text: 'Confirm handover of foundational items supporting the current item.', checked: false },
      { id: 6, text: 'Ensure the isolation work is handed over before backfilling begins.', checked: false },
      { id: 7, text: 'Review design drawings, technical specifications, and other documents.', checked: false },
      { id: 8, text: 'Verify occupational safety conditions for item handover.', checked: false },
      { id: 9, text: 'Confirm removal of waste generated during execution.', checked: false },
      { id: 10, text: 'Designate storage and curing areas.', checked: false },
    ]
  },
  {
    id: 'backfilling-handover',
    title: 'Backfilling Works Handover Checklist',
    items: [
      { id: 1, text: 'Confirm backfill layer thickness matches consultant recommendations.', checked: false },
      { id: 2, text: 'Verify elevation of the backfill layer (foundation level).', checked: false },
      { id: 3, text: 'Ensure compaction method aligns with consultant recommendations.', checked: false },
      { id: 4, text: 'Verify weight used for compaction complies with consultant instructions.', checked: false },
      { id: 5, text: 'Confirm compaction test results and water content percentage before proceeding to the next layer.', checked: false },
      { id: 6, text: 'Ensure the replacement layer matches approved samples and is free of impurities/organic materials.', checked: false },
      { id: 7, text: 'Confirm backfill elevation meets the final specified level.', checked: false },
    ]
  }
];

// Animation variants
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

// Main component
export function ExcavationScreen() {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<'home page' | 'excavation' | 'backfilling'>('home page');
  const [excavationData, setExcavationData] = useState(excavationChecklists);
  const [backfillingData, setBackfillingData] = useState(backfillingChecklists);

  // Handle checkbox changes for excavation
  const handleExcavationCheckItem = (sectionId: string, itemId: number) => {
    setExcavationData(prevChecklists => 
      prevChecklists.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          };
        }
        return section;
      })
    );
  };

  // Handle checkbox changes for backfilling
  const handleBackfillingCheckItem = (sectionId: string, itemId: number) => {
    setBackfillingData(prevChecklists => 
      prevChecklists.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          };
        }
        return section;
      })
    );
  };

  // Handle approval for excavation
  const handleExcavationApproval = () => {
    const allChecked = excavationData.every(section => 
      section.items.every(item => item.checked)
    );

    if (!allChecked) {
      alert('Please complete all excavation checklist items before approval.');
      return;
    }

    alert('All excavation items checked! Excavation work approved.');
    setActiveScreen('home page');
  };

  // Handle approval for backfilling
  const handleBackfillingApproval = () => {
    const allChecked = backfillingData.every(section => 
      section.items.every(item => item.checked)
    );

    if (!allChecked) {
      alert('Please complete all backfilling checklist items before approval.');
      return;
    }

    alert('All backfilling items checked! Backfilling work approved.');
    setActiveScreen('home page');
  };

  // Render the home screen with category cards
  const renderHomeScreen = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Excavation Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => setActiveScreen('excavation')}
          className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-brand-teal bg-opacity-20 rounded-xl flex items-center justify-center dark:bg-brand-teal/30">
                <Shovel className="w-6 h-6 text-brand-teal" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy dark:text-white">Excavation</h2>
            </div>
            <p className="text-gray-500 mb-4 dark:text-gray-400">
              Complete all excavation-related checks and verifications before proceeding with the project.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {excavationData.reduce((total, section) =>
                  total + section.items.filter(item => item.checked).length, 0
                )} / {excavationData.reduce((total, section) => total + section.items.length, 0)} completed
              </span>
              <ArrowRight className="w-5 h-5 text-brand-teal" />
            </div>
          </div>
        </motion.div>

        {/* Backfilling Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => setActiveScreen('backfilling')}
          className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center dark:bg-blue-500/30">
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy dark:text-white">Backfilling</h2>
            </div>
            <p className="text-gray-500 mb-4 dark:text-gray-400">
              Ensure all backfilling requirements are met according to project specifications.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {backfillingData.reduce((total, section) =>
                  total + section.items.filter(item => item.checked).length, 0
                )} / {backfillingData.reduce((total, section) => total + section.items.length, 0)} completed
              </span>
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  // Render the excavation checklist screen
  const renderExcavationScreen = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {excavationData.map((section) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-xl overflow-hidden dark:bg-slate-800"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-brand-navy mb-4 dark:text-white">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 group"
                  >
                    <button
                      onClick={() => handleExcavationCheckItem(section.id, item.id)}
                      className="mt-1 text-gray-400 hover:text-brand-teal transition-colors dark:hover:text-brand-teal"
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${item.checked ? 'bg-brand-teal border-brand-teal' : 'border-gray-400 dark:border-gray-600'}`}>
                        {item.checked && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                    <span className={`text-sm ${item.checked ? 'text-gray-500 line-through dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Approval Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleExcavationApproval}
          className="px-8 py-4 bg-brand-teal text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
        >
          Approve Excavation Work
        </button>
      </div>
    </div>
  );

  // Render the backfilling checklist screen
  const renderBackfillingScreen = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {backfillingData.map((section) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-xl overflow-hidden dark:bg-slate-800"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-brand-navy mb-4 dark:text-white">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 group"
                  >
                    <button
                      onClick={() => handleBackfillingCheckItem(section.id, item.id)}
                      className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${item.checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400 dark:border-gray-600'}`}>
                        {item.checked && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                    <span className={`text-sm ${item.checked ? 'text-gray-500 line-through dark:text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Approval Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleBackfillingApproval}
          className="px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
        >
          Approve Backfilling Work
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white shadow-lg dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => activeScreen === 'home page' ? navigate('/project/actions') : setActiveScreen('home page')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 dark:text-gray-300 dark:hover:bg-slate-700"
                aria-label={activeScreen === 'home page' ? "Back to project actions" : "Back to excavation and backfilling"}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-brand-navy dark:text-white">
                {activeScreen === 'home page' ? 'Excavation and Backfilling' :
                 activeScreen === 'excavation' ? 'Excavation' : 'Backfilling'}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeScreen === 'home page' && renderHomeScreen()}
      {activeScreen === 'excavation' && renderExcavationScreen()}
      {activeScreen === 'backfilling' && renderBackfillingScreen()}
    </div>
  );
}