import React from 'react'
import AnimeOverview from './components/AnimeOverview';

const page = async ({ params }: { params: { animeId: string } }) => {
    const { animeId } = await params
    const api = `http://localhost:2422/api/anime/${animeId}`

    const res = await fetch(api);
    const data = await res.json();

    console.log(data)

    return (
      <AnimeOverview anime={data.anime}/>
    )
}

export default page