import BASE_URL from "@/data/user-config.json";

export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/product`);
    console.log("Response:", response);

    const data = await response.json();
    console.log("Response json:", data);
    
    // console.log("Response ok:", response.ok);

    // const data = await response.json();
    // console.log("Response json:", data);
    // return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
