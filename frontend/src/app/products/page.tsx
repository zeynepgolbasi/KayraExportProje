"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Product`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Ürünler alınamadı:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <p className="p-4">Yükleniyor...</p>;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="sticky top-0 z-10 shadow-lg bg-indigo-600">
                <div className="flex justify-between items-center h-16 px-6">
                    {/* Sol kısım: Başlık */}
                    <span className="text-2xl font-extrabold text-white tracking-wider">
                        Envanter Yöneticisi
                    </span>

                    {/* Sağ kısım: Buton */}
                    <Link href="/products/add">
                        <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 shadow-md transition duration-150">
                            Ürün Sayfasına Git
                        </button>
                    </Link>
                </div>
            </header>

            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>
                <ul className="space-y-2">
                    {products.map((p) => (
                        <li key={p.id} className="border p-3 rounded-lg shadow-sm bg-white">
                            <p className="font-semibold">{p.name}</p>
                            <p>{p.description}</p>
                            <p className="text-green-600 font-bold">{p.price} ₺</p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
