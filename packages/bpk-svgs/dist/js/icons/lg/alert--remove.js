import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10 19.06h4.8a3 3 0 0 1-5.6 0zm8-8a5.94 5.94 0 0 0-.74-2.86L8.4 17H20l-2-3zm2.64-9.07L16 6.58a6 6 0 0 0-2-1.22 2 2 0 1 0-3.93 0A6 6 0 0 0 6 11v3l-2 3h1.57l-3.62 3.64.71.71L21.34 2.66z" /></svg>;
  }

}