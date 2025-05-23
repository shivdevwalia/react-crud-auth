import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Photos() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((d) => d.albumId === Number(albumId));
        setPhotos(filtered);
      })

      .catch((err) => console.error("Failed to fetch photos", err));
  }, [albumId]);

  console.log(photos);

  return (
    <div>
      <h2>Photos for Album ID: {albumId}</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Photos;
