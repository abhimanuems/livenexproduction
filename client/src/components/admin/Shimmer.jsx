import React from "react";

const shimmerAnimation = {
  animation: "shimmer 1.5s infinite",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
};

const ShimmerLoader = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-full h-full" style={shimmerAnimation}>
        Loading...
      </div>
    </div>
  );
};

export default ShimmerLoader;
