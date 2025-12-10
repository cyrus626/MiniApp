// Fetch products from fakestoreapi.com
export async function fecthApi() {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        return res.json();
    } catch(e) {
        throw new Error("Failed to fetch post");
    }
}
