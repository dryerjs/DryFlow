import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { RouterProvider } from 'react-router-dom';
import { configure } from 'axios-hooks';
import Axios from 'axios';

import { router } from './router';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

configure({ axios });

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
