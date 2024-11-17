import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import carrouselImg1 from "../assets/carrousel-img1.svg";
import carrouselImg2 from "../assets/carrousel-img2.svg";
import carrouselImg3 from "../assets/carrousel-img3.svg";

interface CarrouselOfImages {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ArrayText: Array<CarrouselOfImages> = [
  {
    id: 0,
    title: "Workout",
    description: "Start training with usand buld muscle or lose weight",
    image: carrouselImg1,
  },
  {
    id: 1,
    title: "Discipline",
    description: "Develop discipline in yourself train every day",
    image: carrouselImg2,
  },
  {
    id: 2,
    title: "Character",
    description: "Cultivate in you an iron character for training",
    image: carrouselImg3,
  },
];

function MainComponent() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    /*
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % ArrayText.length);
    }, 5000);
    */
    if (currentIndex === ArrayText.length) {
      navigate("/login");
    }
  }, [currentIndex]);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === ArrayText.length - 1
        ? ArrayText.length
        : currentIndex + 1
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Box
        component="img"
        src={ArrayText[currentIndex]?.image}
        alt={ArrayText[currentIndex]?.image}
        onClick={handleNextClick}
        sx={{
          height: "450px",
          width: "99%",
          objectFit: "fill",
        }}
      />
      <Box display="flex" flexDirection="column" width="100%" alignItems="center" height="100%" sx={{
        justifyContent: "flex-start",
      }}>
        <Box
          alignItems="center"
          textAlign="left"
          width="90%"
          height="auto"
          sx={{
            padding: "10px",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            {ArrayText[currentIndex]?.title}
          </Typography>
          <Typography
            color="white"
            mt={1}
            sx={{
              height: "30px",
              fontSize: "16px",
              fontWeight: "100"
            }}
          >
            {ArrayText[currentIndex]?.description}
          </Typography>
          <Box
            display="flex"
            sx={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {ArrayText.map((item, index) => (
              <Box
                key={index}
                mt={2}
                sx={{
                  backgroundColor: "#2BE7E8",
                  width: item.id === currentIndex ? "30px" : "10px",
                  height: "10px",
                  borderRadius: "20px",
                  transitionProperty: "all",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                }}
              />
            ))}
          </Box>
        </Box>
        {/* Botón de navegación */}
        <Button
          variant="contained"
          onClick={handleNextClick}
          sx={{
            marginTop: "20px",
            marginBottom: "30px",
            width: "95%",
            padding: "5px",
            borderRadius: "50px",
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            backgroundColor: "#2BE7E8",
            "&:hover": {
              backgroundColor: "#2CE7E5",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default MainComponent;
