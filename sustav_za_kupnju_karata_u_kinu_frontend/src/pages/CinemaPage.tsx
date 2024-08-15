import { MovieCard } from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjectionsByCinemaId } from "../api/getProjectionsByCinemaId";

export const CinemaPage = () => {
  const { cinemaId } = useParams<{ cinemaId: string }>();

  const { data, isLoading, error } = useQuery(
    ["projections", cinemaId],
    () => getProjectionsByCinemaId(cinemaId as string).then((r) => r.data),
    {
      enabled: !!cinemaId,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error && error instanceof Error) {
    return <p>Error loading projections: {error.message}</p>;
  }
  return (
    <div>
      <h1>Projections for Cinema {cinemaId}</h1>
      <div className="projections-grid">
        {data?.length ? (
          data.map((projection: any) => (
            <MovieCard key={projection.id} projection={projection} />
          ))
        ) : (
          <p>No projections available.</p>
        )}
      </div>
    </div>
  );
};
