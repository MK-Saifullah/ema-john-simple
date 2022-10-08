import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Inventory from './components/Inventory/Inventory';
import Main from './components/layouts/Main';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Orders from './components/Orders/Orders';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';
import { productsAndCartLoader } from './loaders/ProductsAndCartLoader';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        { 
          path: '/',
          loader: () => {
            return fetch('products.json');
          }, 
          element: <Shop></Shop>},
        { 
          path: '/orders',
          // loader: async () => {
          //   return fetch('products.json');
          // }, 
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        { path: '/review', element: <Review></Review>},
        { path: '/inventory', element: <Inventory></Inventory>},
        { path: '/login', element: <Login></Login>},
      ]
    },
    { path: '*', element: <NotFound></NotFound>}
  ]);
  return (
    <RouterProvider router={router}>

      {/* <Header></Header>
      <Shop></Shop> */}
    </RouterProvider>
  );
}

export default App;
