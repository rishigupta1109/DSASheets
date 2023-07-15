import React, { useContext } from "react";
import { TopPerformerCard } from "../Components/UI/TopPerformerCard";
import globalContext from "../Components/Context/GlobalContext";

const TopPerfromers = () => {
  const { topPerformers } = useContext(globalContext);
  let topPerformersData = [];
  if (topPerformers) {
    for (let key in topPerformers) {
      topPerformersData.push([key, ...topPerformers[key]]);
    }
    topPerformersData;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "100%",
      }}
    >
      {topPerformersData?.map((data, index) => (
        <TopPerformerCard key={index} users={data.slice(1)} month={data[0]} />
      ))}
    </div>
  );
};

export default TopPerfromers;
