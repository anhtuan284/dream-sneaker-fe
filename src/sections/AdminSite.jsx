import { Link } from "react-router-dom";

const AdminSite = () => {
  return (
    <div className="container mx-auto p-4 padding">
      <h1 className="text-2xl font-bold mb-4">Admin Site</h1>
      <nav className="mb-4">
        <Link
          to="add-shoe"
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Add Shoe
        </Link>
        <Link
          to="edit-shoe"
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        >
          Edit Shoe
        </Link>
        <Link
          to="delete-shoe"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Delete Shoe
        </Link>
      </nav>
    </div>
  );
};

export default AdminSite;
