import React from 'react';
import Button from '@material-ui/core/Button';

export default function Textfield({ className, type, onClick, text, id, style }) {
  return (
    <Button
      id={`shared${id}`}
      type={type}
      variant="contained"
      className={className}
      onClick={onClick}
      style={{ ...style }}
    >
      {text}
    </Button>
  );
}
