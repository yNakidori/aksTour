import React from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import msc from "../images/cruise/msc.png";
import costa from "../images/cruise/costa.png";
import cunard from "../images/cruise/cunard.png";
import norwegian from "../images/cruise/nowegian.png";
import princess from "../images/cruise/princess.png";
import regent from "../images/cruise/regent.png";
import royal from "../images/cruise/royal.png";

const CruiseCard = () => {
  const cruises = [
    { id: 1, image: msc, title: "MSC Cruzeiros" },
    { id: 2, image: costa, title: "Costa Cruzeiros" },
    { id: 3, image: cunard, title: "Cunard Line" },
    { id: 4, image: norwegian, title: "Norwegian Cruise Line" },
    { id: 5, image: princess, title: "Princess Cruises" },
    { id: 6, image: regent, title: "Regent Seven Seas Cruises" },
    { id: 7, image: royal, title: "Royal Caribbean" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cruises.map((cruise) => (
        <Card key={cruise.id} className="p-4 shadow-lg">
          <CardHeader className="pb-2 px-4 flex flex-col items-start">
            <h4 className="font-bold text-xl">{cruise.title}</h4>
          </CardHeader>
          <CardBody className="py-2 flex justify-center">
            <Image
              alt={cruise.title}
              className="object-cover rounded-lg"
              src={cruise.image}
              width={270}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CruiseCard;
