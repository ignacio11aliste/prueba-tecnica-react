import { useState, useEffect } from "react";
import { getRandomFact } from "../fact";

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };
  // para recuperar la cita al cargar la pagina
  useEffect(getRandomFact, []);
  return { fact, refreshFact };
}
