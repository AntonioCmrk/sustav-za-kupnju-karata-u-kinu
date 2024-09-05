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

export interface Seat {
  row: number;
  column: number;
}

export interface ReservationData {
  reservationId: number;
  userId: string;
  userName: string;
  cinemaName: string;
  auditoriumName: string;
  movieName: string;
  projectionDateTime: string | Date;
  seats: Seat[];
}

export interface Reservation {
  reservationId: number;
  userId: string;
  userName: string;
  cinemaName: string;
  auditoriumName: string;
  movieName: string;
  projectionDateTime: number;
  seats: Seat[];
  reservationTime: number;
}

export interface Auditorium {
  id: number;
  name: string;
  numberOfRows: number;
  numberOfColumns: number;
}

export interface CreateCinemaRequestDto {
  name: string;
  numberOfAuditoriums: number;
  numberOfSeats?: number;
  image: string;
  addressDto: {
    postalCode: number;
    city: string;
    country: string;
    streetName: string;
    houseNumber: number;
  };
  auditoriums: {
    name: string;
    numberOfRows: number;
    numberOfColumns: number;
  }[];
}

export interface CreateMovieRequestDto {
  title: string;
  shortDescription: string;
  description: string;
  lengthInMinutes: number;
  originalTitle: string;
  genre: string;
  year: number;
  country: string;
  coverImage: string;
  backgroundImage: string;
}

export interface CreateProjectionRequestDto {
  cinemaId: number;
  movieId: number;
  auditoriumId: number;
  dateTime: string;
  price: number;
}

export interface Movie {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  lengthInMinutes: number;
  originalTitle: string;
  genre: string;
  year: number;
  country: string;
  coverImage: string;
  backgroundImage: string;
}
