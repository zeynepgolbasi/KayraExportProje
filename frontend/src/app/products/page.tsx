"use client";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Product`);
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Ürünler alınamadı:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // ⏳ Yükleniyor ekranı
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700 font-medium">Ürünler yükleniyor...</p>
            </div>
        );
    }

    // ❌ Hata ekranı
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-red-600 font-semibold">
                    Ürünler yüklenemedi. Lütfen API’nin çalıştığından emin olun.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Başlık */}
            <div className="flex justify-between items-center mb-6 pb-2 border-b-4 border-indigo-600">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Ürün Listesi ({products.length})
                </h1>
            </div>

            {/* Boş liste durumu */}
            {products.length === 0 ? (
                <p className="text-gray-600 text-center mt-8 font-medium">
                    Henüz ürün eklenmemiş.
                </p>
            ) : (
                <ul className="space-y-4">
                    {products.map((p) => (
                        <li
                            key={p.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition">
                                {p.name}
                            </h3>

                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {p.description}
                            </p>

                            <span
                                className={`text-xs font-semibold mt-3 inline-block px-2 py-1 rounded ${p.stockQuantity > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {p.stockQuantity > 0
                                    ? `Stok: ${p.stockQuantity}`
                                    : "Stok Bitti"}
                            </span>

                            <p className="text-2xl font-bold text-indigo-700 mt-2">
                                {p.price.toLocaleString("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
