import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((d) => d.postId === Number(postId));
        setComments(filtered);
      })
      .catch((err) => console.error("Failed to fetch comments", err));
  }, [postId]);

  return (
    <div>
      <h1>Comments for POST ID {postId}</h1>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <p>{c.name}</p>
            <p>{c.email}</p>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
