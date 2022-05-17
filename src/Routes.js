import Activity from 'pages/Activity';
import Collection from 'pages/Collection';
import CreateItem from 'pages/CreateItem';
import Home from 'pages/Home';
import Items from 'pages/Items';
import { BrowserRouter, Navigate, Route, Routes as RoutesDOM } from 'react-router-dom';

const routes = [
  {
    name: 'Home',
    key: 'home',
    route: '/',
    component: <Home />,
    noCollapse: true,
  },
  {
    name: 'Items',
    key: 'items',
    route: '/items',
    component: <Items />,
    noCollapse: true,
  },
  {
    name: 'Collection',
    key: 'collection',
    route: '/collection',
    component: <Collection />,
    noCollapse: true,
  },
  {
    name: 'Create Item',
    key: 'create',
    route: '/create',
    component: <CreateItem />,
    noCollapse: true,
  },
  {
    name: 'Activity',
    key: 'activity',
    route: '/activity',
    component: <Activity />,
    noCollapse: true,
  },
];

export default function Routes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RoutesDOM>
        {routes.map((route) => (
          <Route exact path={route.route} element={<>{route.component}</>} key={route.key} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </RoutesDOM>
    </BrowserRouter>
  );
}
