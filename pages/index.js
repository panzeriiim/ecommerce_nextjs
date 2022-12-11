import Item from "../components/Item";
import Layout from "../components/Layout";
import { data } from "../utils/data";

export default function Home() {
  return (
    <div>
      <Layout title={"Homepage"}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.map((prod) => (
            <Item key={prod.id} product={prod} />
          ))}
        </div>
      </Layout>
    </div>
  );
}
