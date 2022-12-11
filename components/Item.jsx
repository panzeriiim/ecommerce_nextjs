import Image from "next/image";
import Link from "next/link";

function Item({ product }) {
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
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
export default Item;
