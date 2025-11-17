'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { CATEGORIES } from '@/types';
import { FiLogOut, FiUser } from 'react-icons/fi';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">RH</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Research Hub</h1>
              <p className="text-xs text-gray-500">Data Stories for Society</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              All Stories
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </Link>

            {status === 'authenticated' ? (
              <>
                <Link
                  href="/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Story
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiUser size={18} />
                    <span className="text-sm font-medium">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Category navigation */}
        <nav className="pb-4 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="px-3 py-1 rounded-full text-sm font-medium border-2 hover:shadow-md transition-all whitespace-nowrap"
                style={{
                  borderColor: color,
                  color: color,
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
