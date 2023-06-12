import { Container } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <IconArrowLeft
      style={{
        cursor: "pointer",
        position: "absolute",
        top: "1.5rem",
        left: "2rem",
        zIndex: 1,
      }}
      onClick={() => navigate(-1)}
    />
  );
};
