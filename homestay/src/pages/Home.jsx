import React from "react";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewNavbar from "../components/NewNavbar";

const Home = () => {
  return (
    <>
      <NewNavbar />
      <Hero />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
