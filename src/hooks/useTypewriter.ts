import { useEffect, useState } from 'react';

/**
 * Types out `text` character by character, matching the caret-terminated
 * headline treatment ("I'm a Software Engineer.|") from the design.
 */
export function useTypewriter(text: string, speed = 60, startDelay = 300) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!text) {
      setOutput('');
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return output;
}
