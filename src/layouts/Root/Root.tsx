import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Form from '../Form';
import Prediction from '../Prediction';

import './Root.scss';

const router = createBrowserRouter([
  {
    path: '/:id',
    element: <Prediction />
  },
  {
    path: '/',
    element: <Form />
  }
]);

const Root: React.FC = () => {
  return (
    <div className="root">
      <RouterProvider router={router} />
    </div>
  );
};

export default Root;
