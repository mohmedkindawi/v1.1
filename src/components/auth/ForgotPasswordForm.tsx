import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { AuthLayout } from './AuthLayout';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      console.error('Firebase password reset error:', error);
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to reset your password"
      useAuthTheme={true}
    >
      {success ? (
        <div className="mt-8 space-y-6">
          <div className="bg-auth-brown bg-opacity-10 text-auth-brown p-4 rounded-lg">
            Password reset email sent! Please check your inbox.
          </div>
          <Link
            to="/signin"
            className="auth-button auth-button-outline inline-block text-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="auth-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="auth-button auth-button-primary"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </div>
            ) : (
              'SEND RESET LINK'
            )}
          </button>

          <Link
            to="/signin"
            className="auth-button auth-button-outline inline-block text-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2 inline" />
            Back to Sign In
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
