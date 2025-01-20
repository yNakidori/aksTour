import React from "react";
import Footer from "./assets/footer";
import Navbar from "./assets/navbar";
import CreateCard from "./assets/admin/CreateCard";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-orange-100">
        <CreateCard />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
