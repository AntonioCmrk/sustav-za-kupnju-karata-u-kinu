import { IMG_URL } from "../constants";

export const CinemaCard = ({ cinema }: any) => {
  return (
    <div className="bg-primary rounded-2xl p-4 flex justify-center align-middle hover:cursor-pointer transform hover:scale-110 transition duration-300 text-quaternary-light">
      <div className="m-2">
        <img
          src={IMG_URL + cinema.image}
          alt={cinema.name}
          className="rounded-2xl w-64 h-96 object-cover m-4"
          onError={(e) =>
            (e.currentTarget.src = IMG_URL + "default_cinema.jpg")
          }
        />
      </div>
      <div className="m-4 my-auto">
        <div>
          <div>{cinema.name}</div>
          <div>
            {cinema.addressDto.streetName} {cinema.addressDto.houseNumber},{" "}
            {cinema.addressDto.city}
          </div>
        </div>
        <hr />
        <div className="m-2">
          <div>{cinema.numberOfSeats} seats</div>
          <div>
            {cinema.numberOfAuditoriums === 1
              ? null
              : cinema.numberOfAuditoriums + " auditoriums"}
          </div>
        </div>
      </div>
    </div>
  );
};
