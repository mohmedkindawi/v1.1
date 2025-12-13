import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, FileDown, User as UserIcon } from 'lucide-react';
import { auth } from '../../lib/firebase';

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const initialChecklists: ChecklistSection[] = [
  {
    title: "Pre-handover Checklist",
    items: [
      {
        id: 1,
        text: 'Verify approval of materials used in the item\'s execution and inspect equipment before starting work.',
        checked: false
      },
      {
        id: 2,
        text: 'Confirm approval of workshop drawings required for execution and review site boundaries.',
        checked: false
      },
      {
        id: 3,
        text: 'Ensure the execution method for the item is approved.',
        checked: false
      },
      {
        id: 4,
        text: 'Verify required tests are conducted per specifications.',
        checked: false
      },
      {
        id: 5,
        text: 'Confirm handover of foundational items supporting the current item.',
        checked: false
      },
      {
        id: 6,
        text: 'Review design drawings, technical specifications, and other documents.',
        checked: false
      },
      {
        id: 7,
        text: 'Verify occupational safety conditions for item handover.',
        checked: false
      },
      {
        id: 8,
        text: 'Confirm removal of waste generated during execution.',
        checked: false
      }
    ]
  },
  {
    title: "Works Inspection Checklist",
    items: [
      {
        id: 9,
        text: 'Ensure the cleanliness of the foundation level and completion of final surface leveling',
        checked: false
      },
      {
        id: 10,
        text: 'Ensure spraying of insecticides before starting concrete works',
        checked: false
      },
      {
        id: 11,
        text: 'Verify alignment with construction drawings and correct corner markings',
        checked: false
      },
      {
        id: 12,
        text: 'Review foundation dimensions and ensure proper white concrete layer thickness',
        checked: false
      },
      {
        id: 13,
        text: 'Proper backfilling of foundation sides and sealing of any voids',
        checked: false
      },
      {
        id: 14,
        text: 'Confirm the concrete level matches with other foundation levels',
        checked: false
      },
      {
        id: 15,
        text: 'Ensure the water supply is ready before pouring',
        checked: false
      },
      {
        id: 16,
        text: 'Follow the supervisor\'s instructions during concrete pouring',
        checked: false
      }
    ]
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

export function WhiteConcreteScreen() {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState(initialChecklists);
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  const handleCheckItem = (sectionIndex: number, itemId: number) => {
    setChecklists(prev => prev.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return section;
    }));
  };

  const handleSave = () => {
    alert('Checklist saved successfully!');
  };

  const handleExport = () => {
    alert('Exporting to PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/project/basics')}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
                aria-label="Back to basics"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-white">White Concrete</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg">
              {userInitial || <UserIcon className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            {checklists.map((section, sectionIndex) => (
              <div key={section.title} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold text-brand-teal mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="flex items-start space-x-3 group"
                    >
                      <button
                        onClick={() => handleCheckItem(sectionIndex, item.id)}
                        className="mt-1 text-gray-400 hover:text-brand-teal transition-colors"
                      >
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                          item.checked ? 'bg-brand-teal border-brand-teal' : 'border-gray-400'
                        }`}>
                          {item.checked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                      <span className={`text-sm ${
                        item.checked ? 'text-gray-400 line-through' : 'text-gray-300'
                      }`}>
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-opacity-90 transition-colors"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Checklist
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-6 py-3 border-2 border-brand-teal text-brand-teal rounded-xl hover:bg-brand-teal hover:text-white transition-colors"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}