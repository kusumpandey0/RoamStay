import React from "react";
import { FaGlobe, FaWater, FaHotel, FaHouseUser } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import {
  GiMountainCave,
  GiVillage,
  GiPathDistance,
  GiTreehouse,
  GiTempleGate,
  GiElephant,
  GiMeditation,
  GiParachute,
  GiCampingTent,
} from "react-icons/gi";
import { PiBathtubFill } from "react-icons/pi";
import {
  FaPumpSoap,
  FaShower,
  FaKey,
  FaUmbrellaBeach,
  FaFireExtinguisher,
  FaCarSide,
} from "react-icons/fa";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiWifi,
  BiSolidFridge,
  BiSolidFirstAid,
} from "react-icons/bi";
import { MdPets, MdYard, MdBalcony } from "react-icons/md";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiToaster,
  GiBarbecue,
  GiCampfire,
} from "react-icons/gi";
import { TbIroning3 } from "react-icons/tb";
import { BsPersonWorkspace, BsSnow } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { MdMicrowave } from "react-icons/md";
export const categories = [
  { id: "all", name: "All", icon: <FaGlobe /> },
  { id: "mountain-stays", name: "Mountain Stays", icon: <GiMountainCave /> },
  { id: "village-homestays", name: "Village Homestays", icon: <GiVillage /> },
  { id: "lakefront-stays", name: "Lakefront Stays", icon: <FaWater /> },
  {
    id: "trekking-basecamps",
    name: "Trekking Basecamps",
    icon: <GiPathDistance />,
  },
  { id: "eco-retreats", name: "Eco-Friendly Retreats", icon: <GiTreehouse /> },
  { id: "cultural-stays", name: "Cultural Stays", icon: <GiTempleGate /> },
  { id: "jungle-wildlife", name: "Jungle and Wildlife", icon: <GiElephant /> },
  { id: "luxury-escapes", name: "Luxury Escapes", icon: <FaHotel /> },

  {
    id: "spiritual-retreats",
    name: "Spiritual Retreats",
    icon: <GiMeditation />,
  },
  { id: "adventure-hubs", name: "Adventure Hubs", icon: <GiParachute /> },
  {
    id: "remote-hideaways",
    name: "Remote Hideaways",
    icon: <GiCampingTent />,
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Traditional Wooden Architecture",
    icon: <PiBathtubFill />,
  },
  {
    name: "Outdoor Shower",
    icon: <FaShower />,
  },
  {
    name: "Fireplace",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Personal Care Products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Washing Facilities",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "WiFi (Limited Access)",
    icon: <BiWifi />,
  },

  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Campfire Area",
    icon: <GiCampfire />,
  },
  {
    name: "Barbecue Grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Outdoor Dining Area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Self Check-in",
    icon: <FaKey />,
  },
  {
    name: "Pet Allowed",
    icon: <MdPets />,
  },
  {
    name: "Free Parking",
    icon: <AiFillCar />,
  },
  {
    name: "Security Cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Dedicated Workspace",
    icon: <BsPersonWorkspace />,
  },
  {
    name: "First Aid Kit",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Traditional Local Decor",
    icon: <PiBathtubFill />,
  },
  {
    name: "Camping/ Trekking Support",
    icon: <FaCarSide />,
  },
  {
    name: "Local Cultural Experiences",
    icon: <MdPets />,
  },
];
export const basic = [
  {
    name: "Guests",
    field: "guest",
  },
  {
    name: "Bedrooms",
    field: "bedroom",
  },
  {
    name: "Beds",
    field: "bed",
  },
  {
    name: "Bathrooms",
    field: "bathroom",
  },
];
