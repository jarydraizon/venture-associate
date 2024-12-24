
'use client';

import RegisterForm from './components/RegisterForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}
