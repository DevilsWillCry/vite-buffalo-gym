import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AppIcon from "../assets/buffalo-logo.svg";

const ScrollPicker = ({ items }: { items: number[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const itemHeight = 40; // Altura de cada elemento
    const index = Math.round(scrollTop / itemHeight);
    setSelectedIndex(index);
  };

  return (
    <Box display="flex"
    sx={{
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
    }}
    >
      <Box
        component="img"
        alt={AppIcon}
        src={AppIcon}
        sx={{
          borderRadius: "50px",
          width: "300px",
          height: "300px",
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: "500", color: "#ffffff" }}>
        Enter your height
      </Typography>
      <Box
        sx={{
          width: "320px",
          height: "400px",
          overflowY: "scroll",
          scrollbarWidth: "none", // Oculta el scrollbar en Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Oculta el scrollbar en Chrome
          backgroundColor: "#2E3562",
          borderRadius: "10px",
          position: "relative",
          textAlign: "center",
        }}
        onScroll={handleScroll}
      >
        <Box sx={{ position: "relative", padding: "150px 0"}}>
          {items.map((item, index) => (
            <Typography
              key={item}
              sx={{
                height: "40px",
                lineHeight: "40px",
                fontSize: selectedIndex === index ? "27px" : "18px",
                fontWeight: selectedIndex === index ? "bold" : "normal",
                color: selectedIndex === index ? "#ffffff" : "#888888",
                transition: "all 0.3s ease",
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              right: "0",
              height: "40px",
              width: "320px",
              borderTop: "2px solid lightblue",
              borderBottom: "2px solid lightblue",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50.3%",
            left: "45%",
            right: "0",
            height: "40px",
            width: "320px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            fontSize: "100",
          }}
        >
          cm
        </Typography>
      </Box>
    </Box>
  );
};

export default ScrollPicker;
