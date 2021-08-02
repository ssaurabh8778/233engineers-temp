import React, { useState, useEffect } from "react";
import ServicesCard from "./partials/ServicesCard";
import "./Services.css";
import firebase from "../../firebase";


const Services = () => {
  const [imageLinks, setImageLinks] = useState({});
  useEffect(() => {
    firebase
      .database()
      .ref("websiteContent/sectorsLinkImages")
      .get()
      .then((snapshot) => {
        console.log("this", snapshot.val());
        setImageLinks(snapshot.val());
      });
  }, []);

  const serviceCardDetails = [
    {
      sectorName: "Energy & Resources",
      imgSrc: imageLinks.energy_and_resources,
    },
    {
      sectorName: "Biomedical Engineering",
      imgSrc: imageLinks.biomedical_engineering,
    },
    {
      sectorName: "Project Management",
      imgSrc: imageLinks.project_management,
    },
    {
      sectorName: "Transportation",
      imgSrc: imageLinks.transportation,
    },
    {
      sectorName: "Process & Manufacturing",
      imgSrc: imageLinks.process_and_manufacturing,
    },
    {
      sectorName: "Digital & IT",
      imgSrc: imageLinks.digital_and_it,
    },
    {
      sectorName: "Geosciences",
      imgSrc: imageLinks.geosciences,
    },
    {
      sectorName: "Property & Buildings",
      imgSrc: imageLinks.property_and_buildings,
    },
    {
      sectorName: "Water & Environment",
      imgSrc: imageLinks.water_and_environment,
    },
    {
      sectorName: "Philanthropy Projects",
      imgSrc: imageLinks.philanthropy_projects,
    },
    {
      sectorName: "Mentoring Program",
      imgSrc: imageLinks.mentoring_program,
    },
  ];
  return (
    <>
      <div className="services--container">
        {serviceCardDetails.map((sector) => (
          <ServicesCard sectorName={sector.sectorName} src={sector.imgSrc} />
        ))}
      </div>
    </>
  );
};
export default Services;