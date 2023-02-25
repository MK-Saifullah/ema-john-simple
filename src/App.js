import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Inventory from './components/Inventory/Inventory';
import Main from './components/layouts/Main';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Orders from './components/Orders/Orders';
import Review from './components/Review/Review';
import Shipping from './components/Shipping/Shipping';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUp/SignUp';
import { productsAndCartLoader } from './loaders/ProductsAndCartLoader';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main></Main>,
      children: [
        { 
          path: '/',
          // loader: () => {return fetch('http://localhost:5000/products');}, 
          element: <Shop></Shop>
        },
        { 
          path: '/orders',
          // loader: async () => {
          //   return fetch('products.json');
          // }, 
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        { path: '/review', element: <Review></Review>},
        { path: '/inventory', element: <PrivateRoute><Inventory></Inventory></PrivateRoute>},
        { path: '/login', element: <Login></Login>},
        { path: 'signup', element: <SignUp></SignUp>},
        { path: 'shipping', element: <PrivateRoute><Shipping></Shipping></PrivateRoute>}
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
