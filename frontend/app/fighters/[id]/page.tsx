'use client';

import { useEffect, useState } from 'react';
import { Fighter } from '@/types/fighter';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function FighterDetail() {
  const params = useParams();
  const [fighter, setFighter] = useState<Fighter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchFighter(params.id as string);
    }
  }, [params.id]);

  const fetchFighter = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiUrl}/api/fighters/${id}`);
      if (!response.ok) {
        throw new Error('Fighter not found');
      }
      const data = await response.json();
      setFighter(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getFormRatingColor = (rating: number) => {
    if (rating >= 9) return 'from-red-600 to-red-700';
    if (rating >= 8) return 'from-red-500 to-red-600';
    return 'from-gray-600 to-gray-700';
  };

  const getResultColor = (result: string) => {
    if (result === 'Win') return 'bg-white text-black';
    if (result === 'Loss') return 'bg-red-600 text-white';
    return 'bg-gray-600 text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-600 animate-pulse">Loading fighter details...</div>
      </div>
    );
  }

  if (error || !fighter) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-2xl text-red-600 font-bold">Error: {error || 'Fighter not found'}</div>
        <Link href="/" className="text-white hover:text-red-600 transition-colors font-semibold">
          ← Back to All Fighters
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-red-600 transition-colors font-semibold mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to All Fighters
        </Link>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-2xl overflow-hidden border border-[#2a2a2a] mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Fighter Image */}
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-black">
              <Image
                src={fighter.image}
                alt={fighter.name}
                fill
                className="object-contain object-center"
                unoptimized
              />
            </div>

            {/* Fighter Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <div className="inline-block bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-red-600/50 mb-4">
                  <span className="text-white text-sm font-bold uppercase tracking-wider">{fighter.weightClass} Division</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-2">{fighter.name}</h1>
                <p className="text-2xl text-gray-400 font-bold uppercase tracking-wide">&quot;{fighter.nickname}&quot;</p>
              </div>

              {/* Form Rating */}
              <div className="mb-8">
                <div className={`inline-block bg-gradient-to-r ${getFormRatingColor(fighter.currentFormRating)} px-8 py-4 rounded-xl shadow-2xl`}>
                  <div className="text-white text-5xl font-black mb-1">{fighter.currentFormRating}</div>
                  <div className="text-white text-sm font-semibold uppercase tracking-wider">Current Form Rating</div>
                </div>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Record</div>
                  <div className="text-2xl font-bold">
                    <span className="text-white">{fighter.record.wins}</span>-
                    <span className="text-red-600">{fighter.record.losses}</span>-
                    <span className="text-gray-500">{fighter.record.draws}</span>
                  </div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Nationality</div>
                  <div className="text-lg font-semibold text-white">{fighter.nationality}</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Age</div>
                  <div className="text-lg font-semibold text-white">{fighter.age} years</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Height</div>
                  <div className="text-lg font-semibold text-white">{fighter.height}</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Reach</div>
                  <div className="text-lg font-semibold text-white">{fighter.reach}</div>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-[#2a2a2a]">
                  <div className="text-gray-400 text-sm mb-1">Stance</div>
                  <div className="text-lg font-semibold text-white">{fighter.stance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Recent Fights */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Fighting Stats */}
          <div className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-2xl p-8 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-red-600"></div>
              <h2 className="text-3xl font-black text-white">Fighting Stats</h2>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Strikes Landed/Min</span>
                  <span className="font-bold text-white text-lg">{fighter.stats.strikesLandedPerMinute}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    style={{width: `${Math.min(fighter.stats.strikesLandedPerMinute * 15, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Striking Accuracy</span>
                  <span className="font-bold text-white text-lg">{fighter.stats.strikingAccuracy}%</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    style={{width: `${fighter.stats.strikingAccuracy}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Takedown Average</span>
                  <span className="font-bold text-white text-lg">{fighter.stats.takedownAverage}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    style={{width: `${Math.min(fighter.stats.takedownAverage * 20, 100)}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Takedown Accuracy</span>
                  <span className="font-bold text-white text-lg">{fighter.stats.takedownAccuracy}%</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    style={{width: `${fighter.stats.takedownAccuracy}%`}}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 font-medium">Submission Average</span>
                  <span className="font-bold text-white text-lg">{fighter.stats.submissionAverage}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    style={{width: `${Math.min(fighter.stats.submissionAverage * 30, 100)}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Fights */}
          <div className="bg-gradient-to-b from-[#1a1a1a] to-black rounded-2xl p-8 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-red-600"></div>
              <h2 className="text-3xl font-black text-white">Recent Fights</h2>
            </div>
            <div className="space-y-4">
              {fighter.recentFights.map((fight, index) => (
                <div key={index} className="bg-black/50 p-5 rounded-xl border border-[#2a2a2a] hover:border-red-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`${getResultColor(fight.result)} px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-lg`}>
                          {fight.result}
                        </span>
                        <span className="text-white font-bold text-lg">{fight.opponent}</span>
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        {fight.method} • Round {fight.round}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                    <div className="text-xs text-white font-semibold uppercase tracking-wider">{fight.event}</div>
                    <div className="text-xs text-gray-500 font-medium">{new Date(fight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
