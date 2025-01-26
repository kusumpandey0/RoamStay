import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewNavbar from "../components/NewNavbar";
import PopularDestinations from "../components/PopularDestinations";
import { Element } from "react-scroll"; // Import Element from react-scroll
import { useStore } from "../Context/StoreContext";
import CheckAvailability from "../components/CheckAvailability";

const Home = () => {
  const { setMenu } = useStore();
  setMenu("home");
  return (
    <>
      <NewNavbar />
      <Hero />
      <Element name="aboutUsSection" id="aboutUsSection">
        {" "}
        {/* Add name and id to AboutUs */}
        <AboutUs />
      </Element>
      <PopularDestinations />
      <Footer />
    </>
  );
};

export default Home;
