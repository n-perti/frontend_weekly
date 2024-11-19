import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [interest, setInterests] = useState("");
    const [allowOffers, setAllowOffers] = useState(false);

    const [successfullRegister, setSuccessfullRegister] = useState(null);

    async function handleRegister(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                age,
                city,
                interest,
                allowOffers,
            }),
        });
        const data = await response.text();
        if (response.ok) {
            setSuccessfullRegister(true);
        } else {
            setSuccessfullRegister(false);
        }
        console.log(data);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
            <form onSubmit={handleRegister}>
                <label className="block mb-2">Name:</label>
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">Email:</label>
                <input
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">Password:</label>
                <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">Age:</label>
                <input
                    type="text"
                    value={age}
                    required
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">City:</label>
                <input
                    type="text"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">Interests:</label>
                <input
                    type="text"
                    value={interest}
                    required
                    onChange={(e) => setInterests(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <label className="block mb-2">Allow offers:</label>
                <input
                    type="checkbox"
                    checked={allowOffers}
                    onChange={(e) => setAllowOffers(e.target.checked)}
                    className="mb-4"
                />
                <br />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
            </form>
            {successfullRegister === true && <p className="mt-4 text-green-500">Register successful</p>}
        </div>
    );
}
export default Register;
