import { useState } from "react";

export const useSingletonCall = (callback = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callback();
  setHasBeenCalled(true);
};
