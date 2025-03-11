import { Admin, Resource, ShowGuesser, EditGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Inventory2Icon from '@mui/icons-material/Inventory2';
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import { CategoryList, CategoryCreate, CategoryEdit } from "./Category";
import { ProductList, ProductCreate, ProductEdit } from "./Product";
import ProductUpdate from "./component/ProductUpdate";
import { CartList, CartShow } from './Cart';
export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <CustomRoutes>
      <Route
        path="/products/:id/update-image" element={<ProductUpdate />}
      />
    </CustomRoutes>
    <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} icon={CategoryIcon} />
    <Resource name="carts" list={CartList} show={CartShow} icon={ShoppingCartIcon} />
  </Admin>
);