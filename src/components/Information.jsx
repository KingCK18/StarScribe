import React, { useState } from 'react'

export default function Information() {
    const [tab, setTab] = useState('transcription')
  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center 
    sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl 
        md:text-6xl whitespace-nowrap'>Your<span className='text-blue-5 00 bold'> Transcription
        </span></h1>

        <div className='flex mx-auto bg-white 
        border-2 border-solid border-blue-600 shadow 
        rounded-full overflow-hidden items-center 
        gap-2 '>
             <button onClick={() => setTab('transcription')} 
             className={'px-4 rounded duration-200 py-1 ' + 
             (tab === 'transcription' ? ' bg-blue-500 text-white' : ' text-blue-600 hover:text-blue-800')}>
                Transcription</button>
             <button onClick={() => setTab('translation')} 
             className={'px-4 rounded duration-200 py-1  ' + 
             (tab === 'translation' ? ' bg-blue-500 text-white' : ' text-blue-600 hover:text-blue-800')}>
                Translation</button>
        </div>
    </main>
  )
}
