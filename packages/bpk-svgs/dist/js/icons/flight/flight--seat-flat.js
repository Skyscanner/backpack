import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M22 14v2h-7v2H9v-2H2v-2zM5.5 12A2.5 2.5 0 1 0 3 9.5 2.5 2.5 0 0 0 5.5 12zM16 7.08H9v5h12a5 5 0 0 0-5-5z" /></svg>;
  }

}