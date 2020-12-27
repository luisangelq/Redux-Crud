import { useState } from "react";

//Redux actions
import { useDispatch, useSelector } from "react-redux"; //useDispatch nos ejecuta las acciones que tengamos y useSelector forma para acceder al state
import { createNewActionProduct } from "../actions/productActions";

import Spinner from "./Spinner";

const NewProduct = ({ history }) => {
  const [name, saveName] = useState("");
  const [price, savePrice] = useState("");

  const dispatch = useDispatch();

  //access to state from store
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  //call action from productActions
  const addProduct = (product) => {
    dispatch(createNewActionProduct(product));
  };

  //When user hit submit
  const submitNewProduct = (e) => {
    e.preventDefault();

    //validate
    if (name.trim() === "" || price <= 0) {
      return;
    }
    //create
    addProduct({
      name,
      price,
    });
    
    setTimeout(() => {
      history.push("/");

    }, 3000);
    
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={(e) => saveName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={price}
                  onChange={(e) => savePrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add
              </button>
            </form>

            {loading ? <Spinner /> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-3 text-center">
                Ups Something Was Wrong
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
