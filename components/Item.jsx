import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Cart } from "../Context/CartContext";

function Item({ product }) {
  const { state, dispatch } = useContext(Cart);
  const addToCartHandler = () => {
    const existItem = state.cartItems.find((item) => item.id === product.id);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        quantity: existItem ? existItem.quantity + 1 : 1,
      },
    });
  };
  return (
    <div className="card">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          className="rounded shadow mx-auto"
          width={300}
          height={400}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            addToCartHandler();
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
export default Item;
