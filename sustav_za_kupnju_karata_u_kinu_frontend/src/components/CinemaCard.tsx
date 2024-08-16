export const CinemaCard = ({ cinema }: any) => {
  return (
    <div
      className="bg-primary rounded-2xl p-4 flex justify-center align-middle hover:cursor-pointer transform hover:scale-125 transition duration-300 text-quaternary-light"
      onClick={() => {}}
    >
      <div className="m-2">
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
  );
};
