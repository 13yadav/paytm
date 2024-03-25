import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h3 className="text-3xl font-semibold mb-1">Hey there 👋</h3>
        <h5 className="text-xl font-semibold mb-5">Welcome to Paytm Clone</h5>
        <Link to="/signin">
          <Button label="Login" />
        </Link>
        <Link to="/signup">
          <Button label="Register" />
        </Link>
      </div>
    </div>
  );
};
