import Collection from 'pages/Collection';
import CreateItem from 'pages/CreateItem';
import Home from 'pages/Home';
import Items from 'pages/Items';
import { IoCreateOutline, IoHome, IoList } from 'react-icons/io5';
import { Navigate, Route, Routes as RoutesDOM } from 'react-router-dom';

const routes = [
  {
    name: 'Home',
    key: 'home',
    route: '/',
    icon: <IoHome size="15px" color="inherit" />,
    component: <Home />,
    noCollapse: true,
  },
  {
    name: 'Items',
    key: 'items',
    route: '/items',
    icon: <IoList size="15px" color="inherit" />,
    component: <Items />,
    noCollapse: true,
  },
  {
    name: 'Collection',
    key: 'collection',
    route: '/collection',
    icon: <IoList size="15px" color="inherit" />,
    component: <Collection />,
    noCollapse: true,
  },
  {
    name: 'Create Item',
    key: 'create',
    route: '/create',
    icon: <IoCreateOutline size="15px" color="inherit" />,
    component: <CreateItem />,
    noCollapse: true,
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
