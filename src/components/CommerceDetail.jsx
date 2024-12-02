import { useState, useEffect } from "react";

const CommerceDetail = (selectedCommerce) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState("");
    const [cif, setCif] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pageId, setpageId] = useState("");

    useEffect(() => {
        const commerce = selectedCommerce.commerce;
        setName(commerce.name);
        setAddress(commerce.address);
        setPhone(commerce.phone);
        setEmail(commerce.email);
        setpageId(commerce.pageId);
        setCif(commerce.cif);
    }, [selectedCommerce]);

    const handleUpdateCommerce = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/api/commerces/update/${cif}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                name,
                address,
                phone,
                email,
                pageId
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Commerce updated successfully");
            });
    };

    const handleDeleteCommerce = () => {
        fetch(`http://localhost:3000/api/commerces/delete/${cif}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Commerce deleted successfully");
            });
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Comercio</h1>
            <form className="p-6 bg-white shadow-md rounded-lg" onSubmit={handleUpdateCommerce}>
                <label className="block mb-2">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">CIF</label>
                <input
                    type="text"
                    value={cif}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Dirección</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Teléfono</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Page Id</label>
                <input
                    type="number"
                    value={pageId}
                    onChange={(e) => setpageId(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Actualizar</button>
            </form>
            <button className="bg-red-500 text-white py-2 px-4 rounded mt-4" onClick={handleDeleteCommerce}>Eliminar Comercio</button>
        </div>
    );
};

export default CommerceDetail;