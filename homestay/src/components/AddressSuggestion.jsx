import React from "react";
import { useStore } from "../Context/StoreContext"; // import the custom hook

const AddressSuggestion = () => {
  const { address, suggestions } = useStore();

  return (
    <div>
      <h1>Address: {address}</h1>
      <h2>Suggestions:</h2>
      <ul>
        {suggestions &&
          suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default AddressSuggestion;
