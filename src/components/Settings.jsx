import { useState, useEffect } from "react";

const UserSettings = ({handleLogout}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [interest, setInterests] = useState("");
    const [allowOffers, setAllowOffers] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/users/details", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
            setAge(data.age);
            setCity(data.city);
            setInterests(data.interest);
            setAllowOffers(data.allowOffers);
          });
      }, []);

    const handleDeleteUser = () => {
        fetch("http://localhost:3000/api/users/delete", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("User deleted successfully");
            handleLogout();
        });
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    return (
        // Update user form

        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Usuario</h1>
            <form className="p-6 bg-white shadow-md rounded-lg" onSubmit={handleSumbit}>
                <label className="block mb-2">Nombre</label>
                <input
                    type="text"
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Correo Electrónico</label>
                <input
                    type="email"
                    placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Contraseña</label>
                <input
                    type="password"
                    placeholder='********'
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Edad</label>
                <input
                    type="number"
                    placeholder={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Ciudad</label>
                <input
                    type="text"
                    placeholder={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Intereses</label>
                <input
                    type="text"
                    placeholder={interest}
                    onChange={(e) => setInterests(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <label className="block mb-2">Recibir ofertas</label>
                <input
                    type="checkbox"
                    checked={allowOffers}
                    onChange={(e) => setAllowOffers(e.target.checked)}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Actualizar</button>
                <br />
            </form>
                <button onClick={handleDeleteUser} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Eliminar Usuario </button>
        </div>
    );
}
export default UserSettings;
