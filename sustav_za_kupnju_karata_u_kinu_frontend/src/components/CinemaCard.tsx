export const CinemaCard = ({ cinema }: any) => {
  console.log("cinema", cinema);
  return (
    <div
      className="bg-primary-light rounded-2xl p-4 flex justify-center align-middle hover:cursor-pointer transform hover:scale-125 transition duration-300"
      onClick={() => {}}
    >
      <div>slika</div>
      <div>
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
    </div>
  );
};
