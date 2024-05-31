import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="465" rx="3" ry="3" width="280" height="6" /> 
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="274" rx="0" ry="0" width="280" height="30" /> 
    <rect x="0" y="328" rx="10" ry="10" width="280" height="78" /> 
    <rect x="0" y="420" rx="0" ry="0" width="83" height="34" /> 
    <rect x="163" y="415" rx="20" ry="20" width="113" height="40" />
  </ContentLoader>
)

export default Skeleton

