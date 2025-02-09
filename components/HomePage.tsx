import Link from 'next/link'
import React from 'react'

const HomePage = ({animes}:{animes:any}) => {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-4xl font-bold mb-6 text-center">HiAnime - Explore Animes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {animes?.map((anime:any) => (
        <Link key={anime.animeId} href={`/${anime.animeId}`}>
          <div className="bg-gray-900 flex flex-col rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform cursor-pointer">
            <div className='w-full h-[300px] overflow-hidden'>
            <img
              src={anime.animeImage}
              alt={anime.animeName}
              width={300}
              height={450}
              className="rounded-xl w-full h-full object-cover "
            />
            </div>
        
            <h2 className="text-lg font-semibold mt-2">{anime.animeName}</h2>
            <p className="text-sm text-gray-400">{anime.genre.join(", ")}</p>
            <div className="flex justify-between mt-2 text-gray-300">
              <span>{anime.animeType}</span>
              <span>{anime.quality}</span>
            </div>
            <div className="flex justify-between mt-1 text-yellow-400">
              <span>⭐ {anime.rating.toFixed(2)}</span>
              <span>{anime.totalEpisodes} Eps</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  )
}

export default HomePage