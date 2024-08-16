import { createBrowserRouter } from 'react-router-dom';
import { SinglePageApplication } from './spa/single-page-application';

export const router = createBrowserRouter([
  {
    path: '/jobs',
    element: <SinglePageApplication />,
  },
]);
