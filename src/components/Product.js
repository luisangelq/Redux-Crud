import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux"; //useDispatch nos ejecuta las acciones que tengamos y useSelector forma para acceder al state
import { deleteProductAction, getEditProductAction } from "../actions/productActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory(); //habilitar history para redireccion

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //to action
        dispatch(deleteProductAction(id));
      }
    });
  };

  //redirect edit
  const redirectEdit = (product) => {
    dispatch( getEditProductAction(product))
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redirectEdit(product)}
          className="btn btn-primary mr-2"
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
