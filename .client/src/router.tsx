import { createBrowserRouter } from 'react-router-dom';
import { SPA } from './spa/SPA';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SPA />,
  },
]);
