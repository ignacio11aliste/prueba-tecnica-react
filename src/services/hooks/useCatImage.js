import { useState, useEffect } from "react";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

// customhooks
export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;

    const threefirstWords = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${threefirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url);
      });
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` };
}
