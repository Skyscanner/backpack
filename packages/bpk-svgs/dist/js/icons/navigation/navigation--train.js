import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M17 18.42v-.996c1.188-.695 2-1.97 2-3.437V5.996A4.01 4.01 0 0 0 15 2H9C6.8 2 5 3.798 5 5.996v7.991c0 1.467.812 2.743 2 3.437v.996L4 22h2.561l2.555-3.003h5.768L17.439 22H20l-3-3.58zM16 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM10.5 3h3c.275 0 .5.225.5.5s-.225.5-.5.5h-3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5zM7 7c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V7zm1 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg>;
  }

}