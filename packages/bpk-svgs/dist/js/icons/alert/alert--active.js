import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10 20h4.8a3 3 0 0 1-5.6 0zM6.34 6.36L4.92 4.94A10 10 0 0 0 2 12h2a8 8 0 0 1 2.34-5.64zM22 12a10 10 0 0 0-2.92-7.06l-1.42 1.42A8 8 0 0 1 20 12zm-4 0a6 6 0 0 0-4-5.66 2 2 0 1 0-3.93 0A6 6 0 0 0 6 12v3l-2 3h16l-2-3z" /></svg>;
  }

}