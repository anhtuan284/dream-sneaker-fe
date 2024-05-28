import { Link, Outlet } from "react-router-dom";

const AdminSite = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 bg-slate-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Admin Dashboard
        </h1>
      </header>
      <nav className="flex justify-center space-x-4 mb-8">
        <Link
          to="add-shoe"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add Shoe
        </Link>
        <Link
          to="edit-shoe"
          className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300"
        >
          Edit Shoe
        </Link>
        <Link
          to="delete-shoe"
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Delete Shoe
        </Link>
      </nav>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminSite;
