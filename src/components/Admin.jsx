import CommerceDetail from "./CommerceDetail";
import CreateCommerce from "./CreateCommerce";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Admin = () => {
    const [commerces, setCommerces] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedCommerce, setSelectedCommerce] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch("http://localhost:3000/api/users/details", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.role === "admin") {
                        setIsAdmin(true);
                        fetchCommerces(token);
                    } else {
                        alert("You are not authorized to view this page.");
                    }
                });
        } else {
            alert("No token found. Please log in.");
        }
    }, []);

    const fetchCommerces = (token) => {
        fetch("http://localhost:3000/api/commerces/view-all", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCommerces(data);
            });
    };

    const getCommerceToken = (token, commerceCIF) => {
        fetch(`http://localhost:3000/api/commerces/view/${commerceCIF}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                navigator.clipboard.writeText(data.token).then(() => {
                    alert("Token copied to clipboard");
                });
                console.log(data.token);
            });
    }

    const showCommerceDetail = (commerce) => {
        setSelectedCommerce(commerce);
    }

    if (!isAdmin) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Commerces</h1>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded mb-4"
                onClick={() => setIsModalOpen(true)}
            >
                Crear Comercio
            </button>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-2 border-b">Commerce</th>
                        <th className="py-2 px-2 border-b">Address</th>
                        <th className="py-2 px-2 border-b">Token</th>
                        <th className="py-2 px-2 border-b">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {commerces.map((commerce) => (
                        <tr key={commerce.id} className="hover:bg-gray-100">
                            <td className="py-2 px-2 border-b">{commerce.name}</td>
                            <td className="py-2 px-2 border-b">{commerce.address}</td>
                            <td className="py-2 px-2 border-b">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => {
                                        const token = localStorage.getItem("token");
                                        getCommerceToken(token, commerce.cif);
                                    }}
                                >
                                    Get Token
                                </button>
                            </td>
                            <td className="py-2 px-2 border-b">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => showCommerceDetail(commerce)}
                                >
                                    Show Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCommerce && (
                <CommerceDetail commerce={selectedCommerce} onClose={() => setSelectedCommerce(null)} />
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateCommerce setCommerces={setCommerces} />
            </Modal>
        </div>
    );
};

export default Admin;