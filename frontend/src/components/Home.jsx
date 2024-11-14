import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="login-container">
      <h2>My Posts App</h2>
      <p>Log in to manage all your posts</p>
      <button className="login-button">
        <Link to="/login">Login</Link>
      </button>
      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Home;
