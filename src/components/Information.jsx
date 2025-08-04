import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
  const { output, finished } = props
  const [tab, setTab] = useState('transcription')
  const [translation, setTranslation] = useState(null)
  const [toLanguage, setToLanguage] = useState('Select language')
  const [translating, setTranslating] = useState(null)
  console.log(output)

  const worker = useRef()

  useEffect(() => {
      if (!worker.current) {
          worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
              type: 'module'
          })
      }

      const onMessageReceived = async (e) => {
          switch (e.data.status) {
              case 'initiate':
                  console.log('DOWNLOADING')
                  break;
              case 'progress':
                  console.log('LOADING')
                  break;
              case 'update':
                  setTranslation(e.data.output)
                  console.log(e.data.output)
                  break;
              case 'complete':
                  setTranslating(false)
                  console.log("DONE")
                  break;
          }
      }

      worker.current.addEventListener('message', onMessageReceived)

      return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || ''

  function handleCopy() {
      navigator.clipboard.writeText(textElement)
  }

  function handleDownload() {
      const element = document.createElement("a")
      const file = new Blob([textElement], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `Starscribe_${new Date().toString()}.txt`
      document.body.appendChild(element)
      element.click()
  }

  function generateTranslation() {
      if (translating || toLanguage === 'Select language') {
          return
      }

      setTranslating(true)

      worker.current.postMessage({
          text: output.map(val => val.text),
          src_lang: 'eng_Latn',
          tgt_lang: toLanguage
      })
  }
    return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center 
    sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto'>
        <h1 className='font-semibold text-4xl sm:text-5xl 
        md:text-6xl whitespace-nowrap'>Your<span className='text-blue-5 00 bold'> Transcription
        </span></h1>

        <div className='grid grid-cols-2 mx-auto bg-white  shadow 
        rounded-full overflow-hidden items-center '>
             <button onClick={() => setTab('transcription')} 
             className={'px-4 rounded duration-200 py-1 ' + 
             (tab === 'transcription' ? ' bg-blue-500 text-white' : ' text-blue-600 hover:text-blue-800')}>
                Transcription</button>
             <button onClick={() => setTab('translation')} 
             className={'px-4 rounded duration-200 py-1  ' + 
             (tab === 'translation' ? ' bg-blue-500 text-white' : ' text-blue-600 hover:text-blue-800')}>
                Translation</button>
        </div>
        {tab === 'transcription' ? (
          <Transcription {...props}/>
        ) : (
          <Translation {...props} />
        )}
    </main>
  )
}
