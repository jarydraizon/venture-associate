
'use client';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">VentureAssociate</div>
        <div className="space-x-4">
          <button className="text-white hover:text-gray-300">Sign In</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
