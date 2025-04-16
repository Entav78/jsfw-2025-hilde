import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface FormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim().includes(' ')) {
      toast.error('Please enter your full name (first and last).');
    }
    if (form.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
    }
    if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      toast.success('Message sent successfully!');
      setForm({ fullName: '', subject: '', email: '', message: '' });
      setErrors({});
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block font-semibold">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block font-semibold">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            rows={5}
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
