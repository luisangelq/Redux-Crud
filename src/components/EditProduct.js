import {useState, useEffect} from 'react'

//Redux Actions
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";

const EditProduct = ({ history }) => {
  const [product, saveProduct] = useState({
    name: "",
    price: "",
  })
  const {name, price} = product;

  const dispatch = useDispatch();
  //product to edit
  const editProduct = useSelector((state) => state.products.editProduct);

  

  useEffect(() => {
    saveProduct(editProduct)
  }, [editProduct])

  //Read form data
  const onChangeForm = (e) => {
    saveProduct({
      ...product,
      [e.target.name] : e.target.value
    })
  }


  const submitEditProduct = (e) => {
    e.preventDefault();

   dispatch(editProductAction(product));
   history.push("/");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>

            <form onSubmit={submitEditProduct}>

              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
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
                  onChange={onChangeForm}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
