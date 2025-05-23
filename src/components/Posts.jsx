import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContextprovider";
import { Link } from "react-router-dom";

function Posts() {
  const { user } = useContext(AuthContext);
  const [posts, setposts] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setposts(data))
        .catch((err) => console.error("Failed to fetch posts", err));
    }
  }, [user]);

  return (
    <>
      <div>
        <h1>{user.username}'s posts</h1>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <p>
                <Link to={`${p.id}/comments`}>{p.title}</Link>
              </p>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* <Outlet></Outlet> */}
    </>
  );
}

export default Posts;
