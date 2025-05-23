import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Albums from "./components/Albums";
import Todos from "./components/Todos";
import Photos from "./components/Photos";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/posts/:postId/comments"
          element={
            <PrivateRoute>
              <Comments />
            </PrivateRoute>
          }
        />
        <Route
          path="/albums"
          element={
            <PrivateRoute>
              <Albums />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/albums/:albumId/photos"
          element={
            <PrivateRoute>
              <Photos></Photos>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
