import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContextprovider";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, email);
    if (success) {
      navigate("/");
    }
    //  else {
    //   setError("Invalid username or email. Please try again.");
    // }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} id="user">
          <input
            id="bye"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="hello"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
