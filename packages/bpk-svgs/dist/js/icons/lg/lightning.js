import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M17.242 10h-3.434l2.228-6.684A.999.999 0 0 0 15.088 2H9.256a1 1 0 0 0-.97.757l-2.5 10A1 1 0 0 0 6.756 14h3.827l-1.634 7.323c-.123.552.512.916.859.492l8.182-9.998c.574-.703.116-1.817-.748-1.817z" /></svg>;
  }

}