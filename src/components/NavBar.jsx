import { Link } from 'react-router-dom';

const NavBar = ({ userLogged, handleLogout }) => {
    return (
        <>
            {userLogged ? (
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-2xl font-bold">WebCommerce</Link>
                        <div>
                            <Link to="/dashboard" className="text-white mr-4">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Dashboard
                                </button>
                            </Link>
                            <Link to="/admin" className="text-white mr-4">
                                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                    Admin
                                </button>
                            </Link>
                            <Link to="/settings" className="text-white mr-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Settings
                                </button>
                            </Link>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-2xl font-bold">WebCommerce</Link>
                        <div>
                            <Link to="/login" className="text-white mr-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register" className="text-white">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default NavBar;