import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6 8H2V4h4zm0 2H2v4h4zm0 6H2v4h4zM22 4H8v4h14zm-2 6H8v4h12zm-4 6H8v4h8z" /><use width="48" height="48" transform="scale(.5)" xlinkHref="#a" /></svg>;
  }

}