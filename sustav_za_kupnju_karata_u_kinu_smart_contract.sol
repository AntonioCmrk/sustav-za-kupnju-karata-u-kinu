// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReservationContract {
    struct Seat {
        uint256 row;
        uint256 column;
    }

    struct Reservation {
        uint256 reservationId;
        string userId;
        string userName;
        string cinemaName;
        string auditoriumName;
        string movieName;
        uint256 projectionDateTime;
        Seat[] seats;
        uint256 reservationTime;
    }

    mapping(uint256 => Reservation) public reservations;
    mapping(string => uint256[]) private reservationsByUser;
    
    event ReservationCreated(
        uint256 reservationId,
        string userId,
        string userName,
        string cinemaName,
        string auditoriumName,
        string movieName,
        uint256 projectionDateTime,
        uint256 reservationTime
    );

    function createReservation(
        uint256 _reservationId,
        string memory _userId,
        string memory _userName,
        string memory _cinemaName,
        string memory _auditoriumName,
        string memory _movieName,
        uint256 _projectionDateTime,
        Seat[] memory _seats,
        uint256 _reservationTime
    ) public {
        Reservation storage newReservation = reservations[_reservationId];
        newReservation.reservationId = _reservationId;
        newReservation.userId = _userId;
        newReservation.userName = _userName;
        newReservation.cinemaName = _cinemaName;
        newReservation.auditoriumName = _auditoriumName;
        newReservation.movieName = _movieName;
        newReservation.projectionDateTime = _projectionDateTime;
        newReservation.reservationTime = _reservationTime;

        for (uint256 i = 0; i < _seats.length; i++) {
            newReservation.seats.push(_seats[i]);
        }

        reservationsByUser[_userName].push(_reservationId);

        emit ReservationCreated(
            _reservationId,
            _userId,
            _userName,
            _cinemaName,
            _auditoriumName,
            _movieName,
            _projectionDateTime,
            _reservationTime
        );
    }

    function getReservation(uint256 _reservationId)
        public
        view
        returns (Reservation memory)
    {
        return reservations[_reservationId];
    }

    function getReservationsByUsername(string memory _userName)
        public
        view
        returns (Reservation[] memory)
    {
        uint256[] memory reservationIds = reservationsByUser[_userName];
        Reservation[] memory userReservations = new Reservation[](reservationIds.length);

        for (uint256 i = 0; i < reservationIds.length; i++) {
            userReservations[i] = reservations[reservationIds[i]];
        }

        return userReservations;
    }
}
