import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AppIcon from "../assets/buffalo-logo.svg";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const ScrollPicker = ({ items }: { items: number[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [selectedIndex3, setSelectedIndex3] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(false);
  const [selectedAge, setSelectedAge] = useState(false);
  const [selectedGender, setSelectedGender] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    setSelectedIndex(index);
  };

  const handleScroll2 = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    setSelectedIndex2(index);
  };

  const handleScroll3 = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    setSelectedIndex3(index);
  };

  const handleNextSectionRight = () => {
    if (!selectedWeight && !selectedAge && !selectedGender) {
      setSelectedWeight(true);
    } else if (selectedWeight && !selectedAge && !selectedGender) {
      setSelectedWeight(false);
      setSelectedAge(true);
    } else if (selectedAge && !selectedGender) {
      setSelectedAge(false);
      setSelectedGender(true);
    } else {
      setSelectedGender(false);
    }
  };

  const handleNextSectionLeft = () => {
    if (selectedWeight && !selectedAge) {
      setSelectedWeight(false);
    } else if (selectedAge && !selectedWeight) {
      setSelectedWeight(true);
      setSelectedAge(false);
    } else if (selectedGender && !selectedAge){
      setSelectedAge(true);
      setSelectedGender(false);
    }
  };

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <KeyboardDoubleArrowLeftIcon
        onClick={handleNextSectionLeft}
        sx={{
          display:
            selectedWeight || selectedAge || selectedGender ? "" : "none",
          color: "white",
          fontSize: "40px",
          cursor: "pointer",
          position: "fixed",
          top: "50%",
          left: "1%",
          transform: "translateY(-50%)",
          animation: "wiggle 1s infinite",
          "@keyframes wiggle": {
            "0%, 100%": {
              transform: "translateY(-50%) translateX(0)",
            },
            "25%": {
              transform: "translateY(-50%) translateX(-5px)",
            },
            "75%": {
              transform: "translateY(-50%) translateX(5px)",
            },
          },
        }}
      />
      <KeyboardDoubleArrowRightIcon
        onClick={handleNextSectionRight}
        sx={{
          display: selectedGender ? "none" : "",
          color: "white",
          fontSize: "40px",
          cursor: "pointer",
          position: "fixed",
          top: "50%",
          right: "1%",
          transform: "translateY(-50%)",
          animation: "wiggle 1s infinite",
          "@keyframes wiggle": {
            "0%, 100%": {
              transform: "translateY(-50%) translateX(0)",
            },
            "25%": {
              transform: "translateY(-50%) translateX(-5px)",
            },
            "75%": {
              transform: "translateY(-50%) translateX(5px)",
            },
          },
        }}
      />
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
        {selectedAge
          ? "Enter your Age"
          : selectedWeight
          ? "Enter your Weight"
          : selectedGender
          ? "Enter your Gender"
          : "Enter your height"}
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            opacity:
              selectedWeight || selectedAge || selectedGender ? "0" : "100%",
            width: "180px",
            height: "300px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Oculta el scrollbar en Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Oculta el scrollbar en Chrome
            backgroundColor: "#2E3562",
            borderRadius: "10px",
            position: "relative",
            textAlign: "center",
            transform:
              selectedWeight || selectedAge
                ? "translateX(-200%)"
                : "translateX(0%)",
            transition: "all 0.3s ease-in-out",
          }}
          onScroll={handleScroll}
        >
          <Box sx={{ position: "relative", padding: "130px 0" }}>
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
              left: "0",
              right: "0",
              height: "40px",
              borderTop: "2px solid lightblue",
              borderBottom: "2px solid lightblue",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "51%",
              left: "75%",
              right: "0",
              height: "40px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "100",
            }}
          >
            cm
          </Typography>
        </Box>
        <Box
          sx={{
            opacity: selectedWeight ? "100%" : "0",
            width: "180px",
            height: "300px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Oculta el scrollbar en Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Oculta el scrollbar en Chrome
            backgroundColor: "#2E3562",
            borderRadius: "10px",
            position: "fixed",
            textAlign: "center",
            transform: selectedWeight ? "translateX(0%)" : "translateX(-200%)",
            transition: "all 0.5s ease",
          }}
          onScroll={handleScroll2}
        >
          <Box sx={{ position: "relative", padding: "130px 0" }}>
            {items.map((item, index) => (
              <Typography
                key={item}
                sx={{
                  height: "40px",
                  lineHeight: "40px",
                  fontSize: selectedIndex2 === index ? "27px" : "18px",
                  fontWeight: selectedIndex2 === index ? "bold" : "normal",
                  color: selectedIndex2 === index ? "#ffffff" : "#888888",
                  transition: "all 0.3s ease",
                }}
              >
                {item - 100}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              right: "0",
              height: "40px",
              borderTop: "2px solid lightblue",
              borderBottom: "2px solid lightblue",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              top: "51%",
              left: "75%",
              right: "0",
              height: "40px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "100",
            }}
          >
            kg
          </Typography>
        </Box>

        <Box
          sx={{
            opacity: selectedAge ? "100%" : "0",
            visibility: selectedAge ? "visible" : "hidden",
            width: "180px",
            height: "300px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Oculta el scrollbar en Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Oculta el scrollbar en Chrome
            backgroundColor: "#2E3562",
            borderRadius: "10px",
            position: "fixed",
            textAlign: "center",
            transform: selectedAge ? "translateX(0%)" : "translateX(-300%)",
            transition: "all 0.5s ease",
          }}
          onScroll={handleScroll3}
        >
          <Box sx={{ position: "relative", padding: "130px 0" }}>
            {items.map((item, index) => (
              <Typography
                key={item}
                sx={{
                  height: "40px",
                  lineHeight: "40px",
                  fontSize: selectedIndex3 === index ? "27px" : "18px",
                  fontWeight: selectedIndex3 === index ? "bold" : "normal",
                  color: selectedIndex3 === index ? "#ffffff" : "#888888",
                  transition: "all 0.3s ease",
                }}
              >
                {item - 132}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              right: "0",
              height: "40px",
              borderTop: "2px solid lightblue",
              borderBottom: "2px solid lightblue",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box
          sx={{
            opacity: selectedGender ? "100%" : "0",
            visibility: selectedGender ? "visible" : "hidden",
            width: "180px",
            height: "300px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Oculta el scrollbar en Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Oculta el scrollbar en Chrome
            backgroundColor: "#2E3562",
            borderRadius: "10px",
            position: "fixed",
            textAlign: "center",
            transform: selectedGender ? "translateX(0%)" : "translateX(-300%)",
            transition: "all 0.5s ease",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default ScrollPicker;
