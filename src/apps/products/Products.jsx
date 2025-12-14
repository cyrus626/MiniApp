import LoadingSpinner from "../../components/LoadingSpinner";
import { fecthApi } from "./fetchApi";
import { useEffect, useState } from "react";
import "../../index.css";
import "./products.css"
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
                setError("Can't access store try again later");
                setLoading(false);
            }
        }

        loadData();
        setLoading(false);
    }, [])
    // Display: image, title, price, rating

    // Filter by category
    // const filteredItems = [{title:"Item 1", imgage:"", price:"5", rating:4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 },
    //     {title:"Item 1", imgage:"", price:"5", rating: 4.5 }
    // ];
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
        <div className="p-3">
            <h2 className="font-bold text-center text-2xl mb-3">Welcome to Store</h2>

            <div className="flex flex-col gap-2 justify-center sm:gap-8 sm:flex-row">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search items"
                    className="p-3 border border-gray-400 rounded-lg 
                        hover:ring ring-gray-400 focus:outline-none" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} 
                className="p-3 border border-gray-400 rounded-lg">
                    <option value="none">Category</option>
                    <option value="Men's clothing">Men's clothing</option>
                    <option value="Women's clothing">Women's clothing</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </div>
            <p className="text-red-700 my-3">{error}</p>
            <div className="grid grid-cols-2 gap-4 px-4
            sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredItems.length === 0 ?
                    (error ? "" : <LoadingSpinner />) :
                    filteredItems.map((item, index) => (
                        <div key={index}
                            className=" bg-white rounded-2xl 
                                shadow-sm border border-gray-200 mb-1
                                overflow-hidden transition hover:shadow-md"
                            onClick={() => setSelectedProduct(item)}>
                            <h3 className="text-lg text-center font-medium
                                text-gray-800 line-clamp-2">
                                {item.title}
                            </h3>
                            <div className="aspect-square bg-gray-100 flex
                                    items-centerjustify-center">
                                <img alt={loading ? <LoadingSpinner /> : ""}
                                    src={item.image}
                                    className="  h-full w-full object-cover
                                    transition hover:scale-105"/>
                            </div>
                            <div className="p-3 space-y-1">
                                <p className="text-base font-semibold text-gray-900">${item.price}</p>
                                <p className="">{item.rating}</p>
                                {/* <p className="">{item.rating.rate}</p> */}
                                <button className="mt-2 w-full py-2
                                    rounded-xl bg-gray-900 text-white
                                    text-sm font-medium active:scale-95
                                    transition">
                                    Add to Cart
                                </button>
                            </div>
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