import { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageWrapper from './components/ui/PageWrapper';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
const SignInForm = lazy(() => import('./components/auth/SignInForm').then(m => ({ default: m.SignInForm })));
const SignUpForm = lazy(() => import('./components/auth/SignUpForm').then(m => ({ default: m.SignUpForm })));
const ForgotPasswordForm = lazy(() => import('./components/auth/ForgotPasswordForm').then(m => ({ default: m.ForgotPasswordForm })));
const ProjectActions = lazy(() => import('./components/project/ProjectActions').then(m => ({ default: m.ProjectActions })));
const ProjectInformation = lazy(() => import('./components/project/ProjectInformation').then(m => ({ default: m.ProjectInformation })));
const ExcavationScreen = lazy(() => import('./components/excavation/ExcavationScreen').then(m => ({ default: m.ExcavationScreen })));
const BasicsScreen = lazy(() => import('./components/project/BasicsScreen').then(m => ({ default: m.BasicsScreen })));
const WhiteConcreteScreen = lazy(() => import('./components/project/WhiteConcreteScreen').then(m => ({ default: m.WhiteConcreteScreen })));
const MyProjects = lazy(() => import('./components/project/MyProjects').then(m => ({ default: m.MyProjects })));
const HomeScreen = lazy(() => import('./components/project/HomeScreen').then(m => ({ default: m.HomeScreen })));
import { PlusCircle, Building2, LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjectStore } from './lib/store';
import ThemeToggle from './components/ui/ThemeToggle';
import LanguageSwitcher from './components/ui/LanguageSwitcher';
import AnimatedLayout from './components/ui/AnimatedLayout';

function Dashboard() {
  const projects = useProjectStore((state) => state.projects);
  const [userInitial, setUserInitial] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.currentUser?.email) {
      const initial = auth.currentUser.email.charAt(0).toUpperCase();
      setUserInitial(initial);
    }
  }, []);

  return (
    <AnimatedLayout>
    <div className="min-h-screen bg-brand-cream dark:bg-slate-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-white shadow dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-semibold text-lg dark:bg-brand-teal/80">
                {userInitial || <UserIcon className="w-5 h-5" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-navy dark:text-white">{t('home.title')}</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('home.welcome', { user: auth.currentUser?.email?.split('@')[0] })}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <button 
                onClick={() => auth.signOut()}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-200 dark:hover:bg-slate-800"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create New Project Card */}
          <Link 
            to="/project/new" 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-teal bg-opacity-10 rounded-xl flex items-center justify-center mb-4 dark:bg-brand-teal/20">
                <PlusCircle className="w-6 h-6 text-brand-teal" />
              </div>
                <h2 className="text-xl font-semibold text-brand-navy mb-2 dark:text-white">{t('cards.create.title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('cards.create.desc')}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 group-hover:bg-gray-100 transition-colors dark:bg-slate-700/50 dark:group-hover:bg-slate-600/50">
                <span className="text-sm font-medium text-brand-teal">{t('cards.create.cta')}</span>
            </div>
          </Link>

          {/* My Projects Card */}
          <Link 
            to="/projects" 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-teal bg-opacity-10 rounded-xl flex items-center justify-center mb-4 dark:bg-brand-teal/20">
                <Building2 className="w-6 h-6 text-brand-teal" />
              </div>
                <h2 className="text-xl font-semibold text-brand-navy mb-2 dark:text-white">{t('cards.projects.title')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('cards.projects.desc')}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 group-hover:bg-gray-100 transition-colors dark:bg-slate-700/50 dark:group-hover:bg-slate-600/50">
              <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-brand-teal">{t('cards.projects.cta')}</span>
                <span className="bg-brand-teal bg-opacity-10 text-brand-teal text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-brand-teal/20 dark:text-brand-teal">
                  {projects.length} Active
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </AnimatedLayout>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <div className="min-h-screen bg-overlay">
        <Router>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <PageWrapper><SignInForm /></PageWrapper>} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <PageWrapper><SignUpForm /></PageWrapper>} />
            <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <PageWrapper><ForgotPasswordForm /></PageWrapper>} />
            <Route path="/dashboard" element={user ? <PageWrapper><Dashboard /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/project/new" element={user ? <PageWrapper><ProjectInformation /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/project/actions" element={user ? <PageWrapper><ProjectActions /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/project/excavation" element={user ? <PageWrapper><ExcavationScreen /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/project/basics" element={user ? <PageWrapper><BasicsScreen /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/project/basics/white-concrete" element={user ? <PageWrapper><WhiteConcreteScreen /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/projects" element={user ? <PageWrapper><MyProjects /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="/home" element={user ? <PageWrapper><HomeScreen /></PageWrapper> : <Navigate to="/signin" />} />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signin"} />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;