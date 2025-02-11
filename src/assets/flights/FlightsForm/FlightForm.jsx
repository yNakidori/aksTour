import axios from "axios";
import { Flights } from "../Flights/Flights";
import { Datepicker } from "../FormElements/Datepicker";
import { CustomSelect } from "../FormElements/ReactSelect";
import qs from "qs";
import { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaUser } from "react-icons/fa";
import airports from "../airports";

axios.defaults.baseURL = "https://test.api.amadeus.com";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const FlightsForm = () => {
  const [flights, setFlights] = useState([]);

  const tokenRequestBody = {
    grant_type: "client_credentials",
    client_id: "1KLI22z0GGAHXq6fMrQiGfmPGGWfDP8o",
    client_secret: "LlvmGJ7mb9CSxPG1",
  };

  const getFlightsData = async ({
    originCode,
    destinationCode,
    departureDate,
    adults,
  }) => {
    try {
      const tokenResponse = await axios.post(
        "/v1/security/oauth2/token",
        qs.stringify(tokenRequestBody)
      );
      const flightsResponse = await axios.get(
        `/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destinationCode}&departureDate=${departureDate}&adults=${adults}&currencyCode=BRL`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        }
      );
      setFlights(flightsResponse.data.data);
    } catch (error) {
      console.error("Erro ao buscar voos", error);
    }
  };

  const getFlights = (event) => {
    event.preventDefault();
    const { originLocation, destinationLocation, departureDate, adults } =
      event.currentTarget;
    getFlightsData({
      originCode: originLocation.value,
      destinationCode: destinationLocation.value,
      departureDate: departureDate.value,
      adults: adults.value,
    });
  };

  return (
    <section className="flex flex-col items-center p-6">
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Veja aqui algumas opções de voos! disponiveis
        </h1>
        <div className="h-1 w-16 bg-indigo-800 mx-auto mt-2 mb-6"></div>
      </div>
      <form
        onSubmit={getFlights}
        className="flex flex-wrap items-center gap-4 p-4 w-full max-w-6xl bg-orange-300 rounded-lg shadow-md"
      >
        <div className="flex items-center border border-x-blue-950 bg-blue-300 rounded-full px-3 py-2 w-full sm:w-auto">
          <FaPlaneDeparture className="text-gray-500 mr-2" />
          <CustomSelect
            name="originLocation"
            options={airports.map((airport) => ({
              value: airport.value,
              label: airport.label,
            }))}
          />
        </div>

        <div className="flex items-center border border-x-blue-950 bg-blue-300 rounded-full px-3 py-2 w-full sm:w-auto">
          <FaPlaneArrival className="text-gray-500 mr-2" />
          <CustomSelect
            name="destinationLocation"
            options={airports.map((airports) => ({
              value: airports.value,
              label: airports.label,
            }))}
          />
        </div>

        <div className="flex items-center border border-x-blue-950 bg-blue-300 rounded-full px-3 py-2 w-full sm:w-auto">
          <Datepicker name="departureDate" />
        </div>

        <div className="flex items-center border border-x-blue-950 bg-blue-300 rounded-full px-3 py-2 w-full sm:w-auto">
          <FaUser className="text-gray-500 mr-2" />
          <CustomSelect
            name="adults"
            options={[
              { value: "1", label: "1 Adulto" },
              { value: "2", label: "2 Adultos" },
            ]}
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-300 text-gray px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>

      <Flights flights={flights} />
    </section>
  );
};
