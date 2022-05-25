import Activity from 'pages/Activity';
import Collection from 'pages/Collection';
import CreateItem from 'pages/CreateItem';
import Home from 'pages/Home';
import Items from 'pages/Items';
import Rankings from 'pages/Rankings';
import { Navigate, Route, Routes as RoutesDOM } from 'react-router-dom';

const routes = [
  {
    name: 'Home',
    key: 'home',
    route: '/',
    component: <Home />,
  },
  {
    name: 'Items',
    key: 'items',
    route: '/items',
    component: <Items />,
  },
  {
    name: 'Collection',
    key: 'collection',
    route: '/collection',
    component: <Collection />,
  },
  {
    name: 'Create Item',
    key: 'create',
    route: '/create',
    component: <CreateItem />,
  },
  {
    name: 'Activity',
    key: 'activity',
    route: '/activity',
    component: <Activity />,
  },
  {
    name: 'Rankings',
    key: 'rankings',
    route: '/rankings',
    component: <Rankings />,
  },
];

export default function Routes() {
  return (
    <RoutesDOM>
      {routes.map((route) => (
        <Route exact path={route.route} element={<>{route.component}</>} key={route.key} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RoutesDOM>
  );
}
