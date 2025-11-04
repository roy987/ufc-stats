'use client';

import { useEffect, useState } from 'react';
import { Fighter } from '@/types/fighter';
import Link from 'next/link';
import Image from 'next/image';

type SortOption = 'name' | 'formRating' | 'wins';

export default function Home() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [filteredFighters, setFilteredFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeightClass, setSelectedWeightClass] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('formRating');

  useEffect(() => {
    fetchFighters();
  }, []);

  useEffect(() => {
    filterAndSortFighters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fighters, selectedWeightClass, sortBy]);

  const fetchFighters = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/fighters`);
      if (!response.ok) {
        throw new Error('Failed to fetch fighters');
      }
      const data = await response.json();
      setFighters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFighters = () => {
    let filtered = [...fighters];

    // Filter by weight class
    if (selectedWeightClass !== 'All') {
      filtered = filtered.filter(fighter => fighter.weightClass === selectedWeightClass);
    }

    // Sort fighters
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'formRating':
          return b.currentFormRating - a.currentFormRating;
        case 'wins':
          return b.record.wins - a.record.wins;
        default:
          return 0;
      }
    });

    setFilteredFighters(filtered);
  };

  const weightClasses = ['All', ...Array.from(new Set(fighters.map(f => f.weightClass)))];

  const getFormRatingColor = (rating: number) => {
    if (rating >= 9) return 'from-red-600 to-red-700';
    if (rating >= 8) return 'from-red-500 to-red-600';
    return 'from-gray-600 to-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-600 animate-pulse">Loading fighters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-600 font-bold">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">
            <span className="text-white">UFC</span>
            <span className="text-red-600"> FIGHTERS</span>
          </h1>
          <div className="h-1 w-32 bg-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-400 text-lg">Elite Fighter Statistics & Records</p>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Weight Class Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-semibold text-gray-400 mb-2">WEIGHT CLASS</label>
            <div className="flex flex-wrap gap-2">
              {weightClasses.map((weightClass) => (
                <button
                  key={weightClass}
                  onClick={() => setSelectedWeightClass(weightClass)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    selectedWeightClass === weightClass
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
                      : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-red-600/50'
                  }`}
                >
                  {weightClass}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-semibold text-gray-400 mb-2">SORT BY</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full md:w-auto px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-semibold border border-[#2a2a2a] hover:border-red-600 focus:outline-none focus:border-red-600 transition-colors"
            >
              <option value="formRating">Form Rating</option>
              <option value="name">Name (A-Z)</option>
              <option value="wins">Total Wins</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-center">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-red-600 font-bold">{filteredFighters.length}</span> fighter{filteredFighters.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Fighter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFighters.map((fighter) => (
            <Link
              href={`/fighters/${fighter.id}`}
              key={fighter.id}
              className="group relative bg-gradient-to-b from-[#1a1a1a] to-black rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
            >
              {/* Image Section */}
              <div className="relative h-80 bg-gradient-to-b from-[#1a1a1a] to-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <Image
                  src={fighter.image}
                  alt={fighter.name}
                  fill
                  className="object-contain object-top group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                {/* Form Rating Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`bg-gradient-to-r ${getFormRatingColor(fighter.currentFormRating)} px-4 py-2 rounded-lg shadow-lg`}>
                    <div className="text-white font-black text-2xl">{fighter.currentFormRating}</div>
                    <div className="text-white text-xs font-semibold">FORM</div>
                  </div>
                </div>
                {/* Weight Class Badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-md border border-red-600/50">
                  <div className="text-white text-xs font-bold uppercase tracking-wider">{fighter.weightClass}</div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6 relative">
                <div className="mb-4">
                  <h2 className="text-2xl font-black text-white mb-1 group-hover:text-red-600 transition-colors">
                    {fighter.name}
                  </h2>
                  <p className="text-gray-400 font-semibold text-sm uppercase tracking-wide">
                    &quot;{fighter.nickname}&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Record</span>
                    <span className="font-bold text-white text-lg">
                      <span className="text-white">{fighter.record.wins}</span>-
                      <span className="text-red-600">{fighter.record.losses}</span>-
                      <span className="text-gray-500">{fighter.record.draws}</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Nationality</span>
                    <span className="font-semibold text-white">{fighter.nationality}</span>
                  </div>

                  <div className="pt-3 border-t border-[#2a2a2a]">
                    <div className="text-center text-sm text-gray-500 group-hover:text-red-600 transition-colors font-semibold">
                      VIEW FULL STATS →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
