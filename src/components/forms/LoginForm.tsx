'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/services/auth.service';
import { saveToken } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        username,
        password,
      });

      saveToken(response.access_token);

      router.push('/dashboard');
    } catch (err: any) {
      alert(
        err?.response?.data?.message ??
          'Login failed',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 text-sm font-medium">
          Username
        </label>

        <input
          className="w-full rounded-lg border p-3"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          className="w-full rounded-lg border p-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
      >
        {loading
          ? 'Signing In...'
          : 'Sign In'}
      </button>
    </form>
  );
}
