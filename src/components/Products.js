import { Fragment, useEffect } from "react";

//Redux import
import { useDispatch, useSelector } from "react-redux"; //useDispatch nos ejecuta las acciones que tengamos y useSelector forma para acceder al state
import { getProductsAction } from "../actions/productActions";

import Product from "./Product";
import Spinner from "./Spinner";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const consultApi = () => {
      dispatch(getProductsAction());
    };
    consultApi();
  }, [dispatch]);

  //get state
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  return (
    <Fragment>
      <h2 className="text-center my-5">Products list</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          There Was An Error
        </p>
      ) : null}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {products.length === 0 ? (
            <div>{loading ? <Spinner /> : "There aren't any products"}</div>
          ) : (
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Products;
