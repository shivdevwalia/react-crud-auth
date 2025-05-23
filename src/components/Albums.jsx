import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContextprovider";
// import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Albums() {
  const { user } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setAlbums(data))
        .catch((err) => console.error("Failed to fetch albums", err));
    }
  }, [user]);
  return (
    <>
      <div>
        <h1>{user.username}'s album</h1>

        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {" "}
              <Link to={`${album.id}/photos`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <Outlet></Outlet> */}
    </>
  );
}

export default Albums;
