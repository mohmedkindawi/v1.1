import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  useAuthTheme?: boolean;
}

export function AuthLayout({ children, title, subtitle, useAuthTheme = false }: AuthLayoutProps) {
  if (useAuthTheme) {
    // Use the same theme as SignIn/SignUp forms
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 auth-gradient">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-auth-brown">{title}</h1>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    );
  }

  // Original layout for other uses
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-white rounded-3xl shadow-xl p-8">
          {/* Pink decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400 rounded-full opacity-20 -translate-y-1/3 translate-x-1/3" />
          
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-8">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}