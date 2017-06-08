import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M15 2H6a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6l-4-4zm1 12.156c0 3.799-4 5-4 5s-4-1.201-4-5V9.618h.131c.265.625.987 1.086 1.869 1.086 1.089 0 1.971-.688 1.995-1.542l.001-.001h.006l.001.001c.025.855.906 1.542 1.995 1.542.882 0 1.604-.46 1.869-1.086H16v4.538zM14.512 7A.512.512 0 0 1 14 6.488V3l4 4h-3.488z" /></svg>;
  }

}