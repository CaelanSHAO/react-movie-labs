import React from "react";
import { useQuery } from "react-query";
import { getPersonDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { useParams, Link } from "react-router-dom";

const PersonDetailsPage = () => {
    const { personId } = useParams();
    const { data, error, isLoading, isError } = useQuery(
        ["personDetails", personId],
        () => getPersonDetails(personId)
      );
    
      if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{error.message}</h1>;
      }
    const { name, biography, birthday, place_of_birth, profile_path, gender,movie_credits} =
      data;

      return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <h1>{name}</h1>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
              style={{ width: "200px", borderRadius: "8px" }}
            />
          )}
          <p>
            <strong>Biography:</strong> {biography || "No biography available."}
          </p>
          <p>
            <strong>Birthday:</strong> {birthday || "N/A"}
          </p>
          <p>
            <strong>Place of Birth:</strong> {place_of_birth || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {gender === 1
              ? "Female"
              : gender === 2
              ? "Male"
              : gender === 3
              ? "Non-binary"
              : "Not specified"}
          </p>
          <>
          <h3>Movies:</h3>
              <ul>
                {
                  movie_credits.cast.map((movie)=>(
                    <li key={movie.id}>
                      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                     </li>
                  ))
                }
              </ul>

          </>
        </div>
      );

    };

    export default PersonDetailsPage;