import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M19 7h-2.18A3 3 0 0 0 17 6a3 3 0 0 0-5-2.22A3 3 0 0 0 7.18 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-5-2a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM9 6a1 1 0 0 1 2 0 1 1 0 0 1-2 0zm10 13H5V9h14zm-7-9l1.24 2.63 2.76.42-2 2 .47 2.95L12 16.63 9.53 18l.47-2.89-2-2 2.76-.42z" /></svg>;
  }

}