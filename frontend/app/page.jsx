
'use client';

import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to VentureAssociate</h1>
        <p className="text-gray-600 mb-8">Your AI-powered venture analysis assistant</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Get Started
        </button>
      </main>
    </div>
  );
}
