import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M18 14v-3a6 6 0 0 0-4-5.66 2 2 0 1 0-3.93 0A6 6 0 0 0 6 11v3l-2 3h16zm-2.46.1l-1.41 1.41-2.13-2.1-2.12 2.13-1.42-1.42L10.59 12 8.46 9.88l1.42-1.42L12 10.59l2.12-2.12 1.41 1.41L13.41 12zM10 19.06h4.8a3 3 0 0 1-5.6 0z" /></svg>;
  }

}