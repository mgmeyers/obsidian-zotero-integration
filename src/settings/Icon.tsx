import { setIcon } from 'obsidian';
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  return (
    <span
      data-icon={name}
      className={className}
      ref={(c) => {
        if (c) {
          setIcon(c, name);
        }
      }}
    />
  );
}
