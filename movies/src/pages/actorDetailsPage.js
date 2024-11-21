import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPersonDetails } from "../api/tmdb-api";

const ActorDetailsPage = () => {
  const { personId } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    getPersonDetails(personId).then((data) => setActor(data));
  }, [personId]);

  return actor ? (
    <div>
      <h1>{actor.name}</h1>
      <p>{actor.biography}</p>
      <h3>Movies:</h3>
      <ul>
        {actor.known_for_department === "Acting" &&
          actor.movie_credits.cast.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ActorDetailsPage;
