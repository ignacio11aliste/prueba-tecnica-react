import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RAMDOM_FACT = 'https://catfact.ninja/fact'
//  CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // no puedes usar react query ,swr,axios,apollo
  useEffect(() => {
    fetch(CAT_ENDPOINT_RAMDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threefirstWords = fact.split(' ', 3).join(' ')

    fetch(
      `https://cataas.com/cat/says/${threefirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
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
