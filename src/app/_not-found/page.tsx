'use client';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <h1 className="text-3xl font-bold">404 - Page introuvable</h1>
      <p className="mt-2 text-gray-500">
        La page que vous cherchez n&apos;existe pas.
      </p>
    </div>
  );
}
