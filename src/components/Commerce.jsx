import { useState } from "react";
import Dashboard from "./Dashboard";

const Commerce = () => {
    const [token, setToken] = useState("");
    const [cif, setCif] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [open, setOpen] = useState(true);

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    };

    const handleCifChange = (event) => {
        setCif(event.target.value);
    }


    const handleValidateToken = () => {
        if (token, cif) {
            setIsTokenValid(true);
            setOpen(false);
        } else {
            alert("Invalid token");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {open && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Enter Commerce Token and CIF</h2>
                    <input
                        autoFocus
                        type="text"
                        value={token}
                        onChange={handleTokenChange}
                        placeholder="Token"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        value={cif}
                        onChange={handleCifChange}
                        placeholder="CIF"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleValidateToken}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Validate
                    </button>
                </div>
            )}
            {isTokenValid && <Dashboard commerceToken={token} cif={cif} />}
        </div>
    );
};

export default Commerce;
