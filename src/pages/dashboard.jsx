import React from "react";
import Weather from "../components/weather";
import PlantCarousel from "../components/plantCarousel";
import Menu from "../components/menu";

const Dashboard = () => {
  return (
    <>
      <div className="text-emerald-800 ml-2 mt-3 text-5xl font-medium leading-tight m-3 mb-10">
        Dashboard
      </div>
      <PlantCarousel />
      <Menu />
      <Weather />
    </>
  );
};

export default Dashboard;
