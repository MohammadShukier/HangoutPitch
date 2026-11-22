import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import mockOutings from "../data/mockOutings";

const STORAGE_KEY = "HANGOUTPITCH_OUTINGS";

const OutingsContext = createContext(null);

export default function OutingsProvider({ children }) {
  const [outings, setOutings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOutings() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === null) {
          setOutings(mockOutings);
        } else {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setOutings(parsed);
          }
        }
      } catch {
        setError("Could not load your saved outings.");
      } finally {
        setIsLoaded(true);
      }
    }
    loadOutings();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveOutings() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(outings));
      } catch {
        setError("Could not save your changes.");
      }
    }
    saveOutings();
  }, [outings, isLoaded]);

  function addOuting(newOuting) {
    setOutings((current) => {
      const nextId = Math.max(0, ...current.map((o) => o.id)) + 1;
      return [...current, { ...newOuting, id: nextId }];
    });
  }

  function updateOuting(id, changes) {
    setOutings((current) =>
      current.map((o) => (o.id === id ? { ...o, ...changes } : o))
    );
  }

  function deleteOuting(id) {
    setOutings((current) => current.filter((o) => o.id !== id));
  }

  function setMyResponse(id, name, response) {
    setOutings((current) =>
      current.map((o) => {
        if (o.id !== id) return o;
        const hasAnswered = o.responses.some((r) => r.name === name);
        const responses = hasAnswered
          ? o.responses.map((r) => (r.name === name ? { ...r, response } : r))
          : [...o.responses, { name, response }];
        return { ...o, responses };
      })
    );
  }

  return (
    <OutingsContext.Provider
      value={{
        outings,
        isLoaded,
        error,
        addOuting,
        updateOuting,
        deleteOuting,
        setMyResponse,
      }}
    >
      {children}
    </OutingsContext.Provider>
  );
}

export function useOutings() {
  return useContext(OutingsContext);
}
