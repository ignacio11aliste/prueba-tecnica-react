import { useCatImage } from "../services/hooks/useCatImage";

export function Otro() {
  const { imageUrl } = useCatImage({ fact: "cat" });

  return <>{imageUrl && <img src={imageUrl} />}</>;
}
