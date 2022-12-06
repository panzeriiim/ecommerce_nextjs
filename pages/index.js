import Item from "../components/Item";
import Layout from "../components/Layout";

export default function Home() {
  const sample = {
    name: "iphone 14pro-max",
    price: 1500,
    slug: "mobile-phone",
    category: "electronic",
    image:
      "https://salt.tikicdn.com/cache/w1200/ts/product/de/53/30/2528f727c39e5acb70abf30fd3162978.jpg",
  };
  return (
    <div>
      <Layout title={"Homepage"}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Item product={sample} />
          <Item product={sample} />
          <Item product={sample} />
          <Item product={sample} />
          <Item product={sample} />
        </div>
      </Layout>
    </div>
  );
}
