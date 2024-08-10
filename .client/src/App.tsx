import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
