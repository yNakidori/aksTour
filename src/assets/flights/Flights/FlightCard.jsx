export const FlightCard = ({
  id,
  numberOfBookableSeats,
  lastTicketingDate,
  totalPrice,
  currency,
  airlineName,
}) => {
  return (
    <div className="group flex justify-between items-center p-4 mb-4 mx-auto rounded-xl w-[90%] shadow-md hover:shadow-[#43CFF3] transition-all hover:scale-105">
      <div>
        <p className="font-futura font-semibold">{`Voo ${id}`}</p>
        <p className="text-gray-600">{`Lugares disponíveis: ${numberOfBookableSeats}`}</p>
        <p className="text-gray-600">{`Último dia para reserva: ${lastTicketingDate}`}</p>
      </div>
      <div>
        <p className="font-futura font-bold text-center mb-2 group-hover:text-[#43CFF3]">
          {`${totalPrice} ${currency}`}
        </p>
        <a
          className="block font-futura font-bold text-base text-white bg-[#F1C933] py-1 px-4 rounded-lg transition-all hover:scale-110 hover:bg-opacity-90"
          href={`/flight/${id}`}
        >
          Quero saber mais
        </a>
      </div>
    </div>
  );
};
