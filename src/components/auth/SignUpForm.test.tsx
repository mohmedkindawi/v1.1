import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, test, expect } from 'vitest';

// Mock the local firebase wrapper so `src/lib/firebase` is not initialized during tests
vi.mock('../../lib/firebase', () => ({ auth: {} }));

// Mock firebase/auth functions used by the component.
// Provide inline functions so the mock factory can be hoisted safely.
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(() => ({})),
  signInWithPopup: vi.fn(() => Promise.resolve({ user: { uid: 'abc' } })),
  createUserWithEmailAndPassword: vi.fn(),
}));

import { signInWithPopup } from 'firebase/auth';
import { SignUpForm } from './SignUpForm';

test('clicking Google button calls signInWithPopup', async () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );

  const button = screen.getByRole('button', { name: /sign up with google/i });
  fireEvent.click(button);

  await waitFor(() => {
    // the mocked signInWithPopup should have been called during click
    expect(signInWithPopup).toHaveBeenCalled();
  });
});
