import React from "react";
import paris from "../../assets/images/pricecards/priceparis.jpg";
import tokyo from "../../assets/images/pricecards/pricetokyo.jpg";
import newyork from "../../assets/images/pricecards/newyorkprice.jpg";

const PricingCards = () => {
  const cardData = [
    {
      image: paris,
      place: "Paris, France",
      price: "R$499",
      features: [
        "3 Nights Stay",
        "Breakfast Included",
        "City Tour",
        "Free Wi-Fi",
      ],
    },
    {
      image: tokyo,
      place: "Tokyo, Japan",
      price: "R$899",
      features: [
        "5 Nights Stay",
        "All Meals",
        "Guided Tours",
        "Airport Pickup",
      ],
    },
    {
      image: newyork,
      place: "New York, USA",
      price: "R$699",
      features: [
        "4 Nights Stay",
        "Broadway Show",
        "Dinner Cruise",
        "Free Wi-Fi",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border border-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={card.image}
            alt={card.place}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">{card.place}</h3>
            <p className="text-gray-500 text-lg mb-4">{card.price}</p>
            <ul className="mb-4 space-y-2">
              {card.features.map((feature, i) => (
                <li key={i} className="text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
