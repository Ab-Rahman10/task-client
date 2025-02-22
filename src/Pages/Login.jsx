import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { user, setUser, googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      // Google Sign-In
      const result = await googleSignIn();
      const user = result.user;

      // Store user info in db
      const userInfo = {
        userID: Date.now(),
        userEmail: user?.email,
        displayName: user?.displayName,
      };
      const res = await axios.post("http://localhost:5000/users", userInfo);
      console.log(res);
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-gray-600 mb-6">Please sign in to access the app</p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-lg flex items-center justify-center gap-3 border"
        >
          <img
            src="https://img.icons8.com/?size=48&id=17949&format=png"
            alt="Google Logo"
            className="w-6 h-6"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
