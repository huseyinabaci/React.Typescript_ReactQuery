import {PostForm} from '../pages/PostForm';
import {TableForm} from '../pages/TableForm';
import {UpdateForm} from '../pages/UpdateForm';
import {RouteObject} from 'react-router-dom';

export const ProductRoutes: RouteObject[] = [
    {
      path: '/',
      element: <TableForm />,
      index: true,
    },
    {
      path: '/post',
      element: <PostForm />,
    },
    {
      path: '/detail/:id',
      element: <UpdateForm />,
    },
  ];