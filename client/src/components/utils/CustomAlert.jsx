import * as React from 'react';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { keyframes } from '@mui/system';

const moveAlert = keyframes`
  0% {
    top: -10vh;
  }
  100% {
    top: 10vh;
  }
`;

export default function CustomAlert({ color, msg }) {
  return (
    <Alert
      severity={color}
      sx={{
        position: 'fixed', // Ensures alert stays on top of other content
        top: '-10vh', // Start from above the screen
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        zIndex: 1000, // Ensure it's above other content
        opacity: 1,
        animation: `${moveAlert} 0.5s ease-out forwards`, // Animation to move alert
      }}
    >
      {msg}
    </Alert>
  );
}
