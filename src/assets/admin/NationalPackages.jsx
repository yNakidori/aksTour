import React, { useEffect, useState } from "react";
import { getFirestore, collection, docs } from "firebase/firestore";
import { db } from "../../firebase/firbase";
import NationalCard from "../destinys/nationalCard";

const NationalPackages = () => {
  const [packages, setPackages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchPackages = async () => {
      const querySnapshot = await docs(collection(db, "nationalPackages"));
      const packagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPackages(packagesData);
    };

    fetchPackages();
  }, []);

  return (
    <div className="flex flex-wrap gap-6">
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <NationalCard
            key={pkg.id}
            imageUrl={pkg.imageUrl}
            title={pkg.title}
            date={pkg.date}
            duration={pkg.duration}
            price={pkg.price}
          />
        ))
      ) : (
        <p>Carregando pacotes...</p>
      )}
    </div>
  );
};

export default NationalPackages;
