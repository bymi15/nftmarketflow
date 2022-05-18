import { ThemeProvider } from '@mui/material/styles';
import App from 'App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from 'state/context';
import theme from 'vui-theme/assets/theme';
import { VisionUIControllerProvider } from 'vui-theme/context';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalContextProvider>
      <VisionUIControllerProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </VisionUIControllerProvider>
    </GlobalContextProvider>
  </ThemeProvider>
);
