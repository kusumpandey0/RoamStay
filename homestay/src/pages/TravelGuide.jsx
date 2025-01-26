import React from "react";
import NewNavbar from "../components/NewNavbar";
import { useStore } from "../Context/StoreContext";

const TravelGuide = () => {
  const { setMenu } = useStore();
  setMenu("travelguides");
  return (
    <div>
      <NewNavbar />
      TravelGuide
    </div>
  );
};

export default TravelGuide;
