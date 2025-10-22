"use client";

import { useState } from "react";

export default function AddProductPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [stockQuantity, setStockQuantity] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct = {
            name,
            price: parseFloat(price),
            description,
            stockQuantity,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Ürün eklenemedi");
            }

            setMessage("Ürün başarıyla eklendi!");
            setName("");
            setPrice("");
            setDescription("");
            setStockQuantity(0);

        } catch (err) {
            setMessage("Ürün eklenirken hata oluştu");
            console.error(err);
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6 pb-2 border-b-4 border-indigo-600">
                <h1 className="text-3xl font-extrabold text-gray-900">Yeni Ürün Ekle </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ürün Adı */}
                <div>
                    <label className="block mb-1 font-bold">Ürün Adı *</label>
                    <input
                        type="text"
                        placeholder="Ürün adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                        maxLength={100}
                    />
                </div>

                {/* Açıklama */}
                <div>
                    <label className="block mb-1 font-bold">Açıklama</label>
                    <textarea
                        placeholder="Ürün açıklaması (isteğe bağlı)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded w-full p-2"
                        maxLength={500}
                    />
                </div>

                {/* Fiyat */}
                <div>
                    <label className="block mb-1 font-bold">Fiyat *</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Örn: 99.99"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                {/* Stok Adedi */}
                <div>
                    <label className="block mb-1 font-bold">Stok Adedi *</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="Örn: 10"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(Number(e.target.value))}
                        className="border rounded w-full p-2"
                    />
                </div>


                {/* Kaydet Butonu */}
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
                >
                    Kaydet
                </button>
            </form>

            {/* Durum mesajı */}
            {message && (
                <p className="mt-4 text-center font-bold">
                    {message}
                </p>
            )}
        </div>
    );
}
