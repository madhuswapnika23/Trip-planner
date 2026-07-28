import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface StatusMessageProps {
  messages: readonly string[];
  intervalMs?: number;
  prefix?: string;
}

export function StatusMessage({ messages, intervalMs = 2000, prefix = '' }: StatusMessageProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, intervalMs);
    return () => clearInterval(id);
  }, [messages, intervalMs]);

  return (
    <p
      className={cn(
        'text-sm text-text-secondary transition-opacity duration-300 text-center',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {prefix}
      {messages[index]}
    </p>
  );
}
