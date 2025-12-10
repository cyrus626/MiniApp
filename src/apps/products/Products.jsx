import LoadingSpinner from "../../components/LoadingSpinner";
import { fecthApi } from "./fetchApi";
import { useEffect, useState } from "react";
import "./products.css";
function Products() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("none");
    const [search, setSearch] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fecthApi();
                setItems(data);
                setLoading(false);
            } catch {
                setError("failed to retrive data");
                setLoading(false);
            }
        }

        loadData();
        setLoading(false);
    }, [])
    // Display: image, title, price, rating

    // Filter by category
    const filteredItems = items.filter(item => {
        const matchesSearch = search
            ? item.title.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesCategory = filter !== "none"
            ? item.category.toLowerCase() == filter.toLowerCase()
            : true;

        return matchesSearch && matchesCategory;
    });


    // Optional: product details modal
    return (
        <div className="ecom-container">
            <h2 >Welcome to Store</h2>

            <div className="ecom-header">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search items"
                    className="ecom-search" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="cat-btn">
                    <option value="none">Category</option>
                    <option value="Men's clothing">Men's clothing</option>
                    <option value="Women's clothing">Women's clothing</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </div>
            <p>{error}</p>
            <div className="product-grid">
                {filteredItems.length === 0 ?
                    (<LoadingSpinner />) :
                    filteredItems.map((item, index) => (
                        <div key={index}
                            className="product-card"
                            onClick={() => setSelectedProduct(item)}>
                            <h3 className="product-title">{item.title}</h3>
                            <img alt={loading ? <LoadingSpinner /> : ""}
                                src={item.image}
                                className="product-img" />
                            <p className="product-price">${item.price}</p>
                            <p className="product-rating">{item.rating.rate}</p>
                        </div>
                    ))}
            </div>

            {selectedProduct && (
                <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">{selectedProduct.title}</h2>
                        <img src={selectedProduct.image} className="modal-img" />
                        <p>{selectedProduct.description}</p>
                        <p className="modal-price">{selectedProduct.price}</p>
                        <button onClick={() => setSelectedProduct(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Products;