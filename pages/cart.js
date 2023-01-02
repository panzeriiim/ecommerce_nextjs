import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../components/Layout";
import { Cart } from "../Context/CartContext";
import {
  XCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";

function CartScreen() {
  const { state, dispatch } = useContext(Cart);
  const { cartItems } = state;
  const remmoveItemHandler = (id) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  };
  const updateQuantityHandler = (item, quantity) => {
    dispatch({ type: "ITEM_UPDATE_QUANTITY", payload: { ...item, quantity } });
  };
  return (
    <Layout title={"Cart Items"}>
      <h1 className="mb-4 text-lg">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h2 className="mb-4 text-base">
          Cart is emty, {<Link href={"/"}>go back to shopping</Link>}
        </h2>
      ) : (
        <div className="grid md:grid-cols-4 md: gap-5">
          <div className="overflow-x-auto md: col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Link
                          className="flex items-center"
                          href={`product/${item.id}`}
                        >
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt="product image"
                          />{" "}
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 flex items-center justify-end">
                        <button
                          onClick={() => {
                            updateQuantityHandler(item, item.quantity - 1);
                          }}
                          disabled={item.quantity === 0}
                        >
                          <MinusCircleIcon className="h-5 w-5"></MinusCircleIcon>
                        </button>
                        <input
                          type={"text"}
                          className="w-10 text-center rounded-md bg-stone-300"
                          value={item.quantity}
                          onChange={(e) => {
                            updateQuantityHandler(item, e.target.value - 0);
                          }}
                        ></input>
                        <button
                          onClick={() => {
                            updateQuantityHandler(item, item.quantity + 1);
                          }}
                        >
                          <PlusCircleIcon className="h-5 w-5"></PlusCircleIcon>
                        </button>
                      </td>
                      <td className="p-5 text-right">{item.price}</td>
                      <td className="p-5 text-center">
                        <button>
                          <XCircleIcon
                            onClick={() => {
                              remmoveItemHandler(item.id);
                            }}
                            className="h-5 w-5"
                          ></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button className="primary-button w-full">Check Out</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default CartScreen;
