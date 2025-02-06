import { Link } from "react-router-dom";

export const FlightCard = ({
  id,
  numberOfBookableSeats,
  lastTicketingDate,
  totalPrice,
  currency,
}) => {
  return (
    <div className="group flex justify-between items-center p-4 mb-4 mx-auto rounded-xl w-[90%] shadow-[1px_1px_15px_0px_rgba(0,0,0,0.2)] hover:shadow-[#43CFF3] transition-all hover:scale-105">
      <div className="font-futura">
        <p>{`Voo ${id}`}</p>
        <p className="flex">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"
              fill="#43CFF3"
              fillOpacity="0.24"
            />
            <circle cx="12" cy="10" r="4" fill="#43CFF3" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.9463 20.2532C18.9616 20.3587 18.9048 20.4613 18.8063 20.5021C17.6048 21 15.8353 21 13 21H11C8.16476 21 6.3953 21 5.19377 20.5022C5.0953 20.4614 5.03846 20.3587 5.05373 20.2532C5.48265 17.2919 8.42909 15 12 15C15.571 15 18.5174 17.2919 18.9463 20.2532Z"
              fill="#43CFF3"
            />
          </svg>

          {`Lugares disponiveis: ${numberOfBookableSeats}`}
        </p>
        <p className="flex">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 4.43245C7 4.27684 7 4.19903 6.9491 4.15423C6.89819 4.10944 6.82244 4.11915 6.67094 4.13857C5.54965 4.28229 4.76806 4.57508 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C19.2319 4.57508 18.4504 4.28229 17.3291 4.13857C17.1776 4.11915 17.1018 4.10944 17.0509 4.15424C17 4.19903 17 4.27684 17 4.43245L17 6.5C17 7.32843 16.3284 8 15.5 8C14.6716 8 14 7.32843 14 6.5L14 4.30005C14 4.15898 14 4.08844 13.9561 4.04451C13.9123 4.00059 13.8418 4.0005 13.7009 4.00031C13.4748 4 13.2412 4 13 4H11C10.7588 4 10.5252 4 10.2991 4.00031C10.1582 4.0005 10.0877 4.00059 10.0439 4.04452C10 4.08844 10 4.15898 10 4.30005L10 6.5C10 7.32843 9.32843 8 8.50001 8C7.67158 8 7 7.32843 7 6.5L7 4.43245Z"
              fill="#43CFF3"
              fillOpacity="0.24"
            />
            <path d="M8.5 2.5L8.5 6.5" stroke="#43CFF3" strokeLinecap="round" />
            <path
              d="M15.5 2.5L15.5 6.5"
              stroke="#43CFF3"
              strokeLinecap="round"
            />
            <circle cx="7.5" cy="10.5" r="0.5" fill="#222222" />
            <circle cx="10.5" cy="10.5" r="0.5" fill="#222222" />
            <circle cx="13.5" cy="10.5" r="0.5" fill="#222222" />
            <circle cx="16.5" cy="10.5" r="0.5" fill="#222222" />
            <circle cx="7.5" cy="13.5" r="0.5" fill="#222222" />
            <circle cx="10.5" cy="13.5" r="0.5" fill="#222222" />
            <circle cx="13.5" cy="13.5" r="0.5" fill="#222222" />
            <circle cx="16.5" cy="13.5" r="0.5" fill="#222222" />
            <circle cx="7.5" cy="16.5" r="0.5" fill="#222222" />
            <circle cx="10.5" cy="16.5" r="0.5" fill="#222222" />
            <circle cx="13.5" cy="16.5" r="0.5" fill="#222222" />
            <circle cx="16.5" cy="16.5" r="0.5" fill="#222222" />
          </svg>

          {`Último dia para efetuar a reserva: ${lastTicketingDate}`}
        </p>
      </div>
      <div>
        <p className="font-futura font-bold text-center mb-2 group-hover:text-[#43CFF3]">
          {`${totalPrice} ${currency}`}
        </p>
        <Link
          className="block font-futura font-bold text-base text-[#1A4762] bg-[#F1C933] py-1 px-4 rounded-lg transition-all hover:scale-110 hover:bg-opacity-90"
          to={`/flight/${id}`}
        >
          Quero saber mais
        </Link>
      </div>
    </div>
  );
};
