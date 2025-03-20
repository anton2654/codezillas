import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonDishCard = (props) => (
  <ContentLoader
    speed={2}
    width={270}
    height={430}
    viewBox="0 0 270 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="15" y="15" rx="0" ry="0" width="240" height="250" />
    <rect x="15" y="275" rx="0" ry="0" width="155" height="21" />
    <rect x="15" y="331" rx="0" ry="0" width="240" height="33" />
    <rect x="15" y="301" rx="0" ry="0" width="113" height="19" />
  </ContentLoader>
);

export default SkeletonDishCard;

//SkeletonDishCard
