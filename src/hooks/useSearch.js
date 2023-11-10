import { useEffect, useState, useRef } from "react";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return
    }

    if (search === "") {
      return setErrorSearch("You can't search an empty field");
    }

    if (search.match(/^[0-9]+$/)) {
      return setErrorSearch("You can't search a number");
    }

    if (search.length < 3) {
      return setErrorSearch("You need to enter at least 3 characters");
    }

    if (search.length > 50) {
      return setErrorSearch("You can't search more than 50 characters");
    }

    setErrorSearch(null);
  }, [search]);

  return { search, updateSearch, errorSearch };
}