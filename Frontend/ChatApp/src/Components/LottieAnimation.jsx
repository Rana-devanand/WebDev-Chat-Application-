import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../public/animation.json";

const LottieAnimation = () => {
  return (
    <div className="" style={{ width: "80%", height: "80%" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        play
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default LottieAnimation;
