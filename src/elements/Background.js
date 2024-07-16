import React from "react";
import styled from "styled-components";
import { ReactComponent as Points } from "../images/puntos.svg";

const Background = () => {
  return (
    <>
      <PointsTop></PointsTop>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fillOpacity="1"
          d="M0,288L26.7,250.7C53.3,213,107,139,160,106.7C213.3,75,267,85,320,117.3C373.3,149,427,203,480,208C533.3,213,587,171,640,170.7C693.3,171,747,213,800,234.7C853.3,256,907,256,960,266.7C1013.3,277,1067,299,1120,277.3C1173.3,256,1227,192,1280,170.7C1333.3,149,1387,171,1413,181.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </Svg>
      <PointsBottom></PointsBottom>
    </>
  );
};

export default Background;

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;

const PointsTop = styled(Points)`
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const PointsBottom = styled(Points)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;
