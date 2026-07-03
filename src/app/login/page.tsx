import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Luxury Ride
        </h1>

        <p className="mb-8 text-center text-gray-500">
          WhatsApp Campaign Platform
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
