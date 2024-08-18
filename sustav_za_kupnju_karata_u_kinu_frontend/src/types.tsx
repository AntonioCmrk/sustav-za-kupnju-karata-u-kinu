export type Cinema = {
  id: number;
  name: string;
  numberOfAuditoriums: number;
  numberOfSeats: number;
  addressDto: AddressDto;
};

export type AddressDto = {
  id: number;
  postalCode: number;
  city: string;
  country: string;
  streetName: string;
  houseNumber: number;
  cinemaId: number;
};

export type Projection = {
  id: number;
  dateTime: string;
  price: number;
  movieTitle: string;
  movieCoverImage: string;
  auditoriumId: string;
};

export type ProjectionDetails = {
  projectionId: number;
  dateTime: string;
  price: number;
  movieTitle: string;
  description: string;
  lengthInMinutes: number;
  originalTitle: string;
  genre: string;
  year: number;
  country: string;
  backgroundImage: string;
};

export type DecodedToken = {
  email: string;
  given_name: string;
  role: string;
};
