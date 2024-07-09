import { useState } from "react";

export const useDigiFight = (initialValue=100) => {
  const [live, setLive] = useState(initialValue);

  const takeDamage = (damage) => {
    setLive(live - damage);
  };

  return {live, takeDamage};
};