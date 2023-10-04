import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/fact'

//  CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // no puedes usar react query ,swr,axios,apollo
  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threefirstWords = fact.split(' ', 3).join(' ')

    fetch(
      `https://cataas.com/cat/says/${threefirstWords}?size=50&color=red&json=true`
    )
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  const handleclick = async () => {
    const newFact = await getRandomFact(setFact)
    setFact(newFact)
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleclick}>Get new Fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  )
}
