import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../../components/Layout";
import { Cart } from "../../Context/CartContext";
import { data } from "../../utils/data";

function ProductScreen() {
  const { state, dispatch } = useContext(Cart);
  const { query } = useRouter();
  const { id } = query;
  const product = data.find((prod) => prod.id === id);
  if (!product)
    return (
      <Layout>
        <h3>Proudct not Found!!!</h3>;
      </Layout>
    );
  const addToCartHandler = () => {
    const existItem = state.cartItems.find((item) => item.id === product.id);
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: existItem ? existItem.quantity + 1 : 1 },
    });
  };
  return (
    <Layout>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="mx-auto"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ProductScreen;
