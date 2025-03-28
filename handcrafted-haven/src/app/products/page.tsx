"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  product_id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Listings</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <div>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${product.product_id} image`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <Link href={`/products/${product.product_id}`}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
