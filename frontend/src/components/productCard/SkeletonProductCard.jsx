import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonProductCard = (props) => (
  <ContentLoader
    speed={2}
    width={270}
    height={430}
    viewBox="0 0 270 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="240" height="250" />
    <rect x="0" y="260" rx="0" ry="0" width="155" height="21" />
    <rect x="0" y="316" rx="0" ry="0" width="240" height="33" />
    <rect x="0" y="286" rx="0" ry="0" width="113" height="19" />
  </ContentLoader>
);

export default SkeletonProductCard;

//SkeletonProductCard
