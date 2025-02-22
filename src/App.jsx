import { useContext } from "react";
import Banner from "../src/Pages/Dashboard/Banner/Banner";
import Navbar from "../src/Pages/Dashboard/Navbar";
import Task from "../src/Pages/Dashboard/Task/Task";
import Login from "./Pages/Login";
import { AuthContext } from "./Provider/AuthProvider";

const App = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }
  return (
    <div>
      {user ? (
        <>
          <Navbar></Navbar>
          <Banner></Banner>
          <Task></Task>
        </>
      ) : (
        <Login></Login>
      )}
    </div>
  );
};

export default App;
