import { FlightCard } from "./FlightCard";

export const Flights = ({ flights }) => {
  return (
    <section id="flightResults" className="pt-1">
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Voos encontrados com base na sua pesquisa
        </h1>
        <div className="h-1 w-16 bg-indigo-600 mx-auto mt-2 mb-6"></div>
      </div>
      {flights &&
        flights
          .slice(0, 5)
          .map((flight) => (
            <FlightCard
              key={flight.id}
              id={flight.id}
              numberOfBookableSeats={flight.numberOfBookableSeats}
              lastTicketingDate={flight.lastTicketingDate}
              totalPrice={flight.price.total}
              currency={flight.price.currency}
            />
          ))}
    </section>
  );
};
