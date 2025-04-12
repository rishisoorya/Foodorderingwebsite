import { Link } from "react-router-dom";
import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "Page Not Found | Dashboard";
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.8s ease-out forwards;
            }
          `,
        }}
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 animate-fadeIn">
        <div className="text-center max-w-2xl">
          {/* Animated illustration */}
          <img
            src="https://yemca-services.net/404.png"
            alt="404 Illustration"
            className="mx-auto w-64 md:w-80 animate-[float_3s_ease-in-out_infinite]"
          />

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mt-8">
            <span className="text-blue-600">404</span> Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-lg mx-auto">
            The page you're looking for doesn't exist or might have been moved.
          </p>

          {/* Primary action button */}
          <div className="mt-8">
            <Link
              to="/admin"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Return to Dashboard
            </Link>
          </div>

          {/* Additional help */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a
                href="mailto:support@yourcompany.com"
                className="text-blue-600 hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;