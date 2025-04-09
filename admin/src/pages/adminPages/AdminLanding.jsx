import { Link } from "react-router-dom";

export default function AdminLanding() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-lg">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Welcome to <span className="text-indigo-600">foodpanda</span> Admin Panel
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Manage your website efficiently with ease and style
        </p>
        <div className="mt-6">
          <Link to={"/admin"}>
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
