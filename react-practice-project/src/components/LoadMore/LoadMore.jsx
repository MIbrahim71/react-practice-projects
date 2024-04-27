import { useEffect, useState } from "react";
import "./loadmore.css";

export default function LoadMore({ url, limit = 20, skip = 0 }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);

  async function fetchProducts(url) {
    try {
      setLoading(true);
      const response = await fetch(
        `${url}?limit=${limit}&skip=${count === 0 ? 0 : count * 20}`
      );
      const data = await response.json();
      console.log(data);

      if (data?.products?.length) {
        setProducts((prevData) => {
          const newProducts = data.products.filter((newProduct) => {
            // Check if the product ID already exists in the existing products to ensure the same products are not appended multiple times
            // ensures only unique products are added, mapped only once
            return !prevData.some(
              (existingProduct) => existingProduct.id === newProduct.id
            );
          });
          return [...prevData, ...newProducts];
        }); // load new and keep old products
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(url);
  }, [url, count]);

  useEffect(() => {
    if (products?.length === 100) setDisable(true);
  }, [products]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="container">
      {products &&
        products.map((product) => (
          <div className="product-container" key={product.id}>
            <img src={product.thumbnail} alt="" />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>£{product.price}</p>
          </div>
        ))}
      <div className="s">
        <button
          disabled={disable}
          className="load"
          onClick={() => setCount(count + 1)}
        >
          {disable ? "No more products" : "Load More"}
        </button>
      </div>
    </div>
  );
}
