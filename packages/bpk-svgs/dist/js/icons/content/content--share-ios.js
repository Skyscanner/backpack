import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h2v10.75a.25.25 0 0 0 .25.25h11.5a.25.25 0 0 0 .25-.25V9zm-9-3v10h2V6l2.5 2.5L17 7l-5-5-5 5 1.5 1.5z" /></svg>;
  }

}