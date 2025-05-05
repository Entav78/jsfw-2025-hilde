import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from './ContactPage';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Toaster } from 'react-hot-toast';

// Mock toast functions
vi.mock('react-hot-toast', async () => {
  const actual = await vi.importActual<typeof import('react-hot-toast')>(
    'react-hot-toast'
  );
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('shows error if required fields are empty or invalid', () => {
    render(
      <>
        <ContactPage />
        <Toaster />
      </>
    );

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/subject must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/message must be at least 10 characters/i)
    ).toBeInTheDocument();
  });

  test('submits form successfully with valid input', () => {
    render(
      <>
        <ContactPage />
        <Toaster />
      </>
    );

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Hilde Marie' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'React Form' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a valid message.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });
});
