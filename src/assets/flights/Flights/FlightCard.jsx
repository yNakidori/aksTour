export const FlightCard = ({
  id,
  numberOfBookableSeats,
  lastTicketingDate,
  totalPrice,
  currency,
  airlineName,
}) => {
  const phoneNumber = "5511957700305";
  const message = encodeURIComponent(
    `Olá! Gostaria de saber mais sobre o voo ${id} da ${airlineName}.`
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="group flex justify-between items-center p-6 mb-6 mx-auto rounded-2xl w-[95%] max-w-2xl shadow-lg hover:shadow-[#43CFF3] transition-all hover:scale-105 bg-white">
      <div className="space-y-2">
        <p className="font-futura font-semibold text-lg">{`Voo ${id} - ${airlineName}`}</p>
        <p className="text-gray-700 text-base">{`Lugares disponíveis: ${numberOfBookableSeats}`}</p>
        <p className="text-gray-700 text-base">{`Reserve até: ${lastTicketingDate}`}</p>
      </div>
      <div className="text-center">
        <p className="font-futura font-bold text-xl mb-3 group-hover:text-[#43CFF3]">
          {`${totalPrice} ${currency}`}
        </p>
        <a
          className="block font-futura font-bold text-lg text-white bg-[#F1C933] py-2 px-6 rounded-lg transition-all hover:scale-110 hover:bg-opacity-90"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Confira esta oferta especial!
        </a>
      </div>
    </div>
  );
};
