import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M13 7.1v-5a10 10 0 0 1 6.74 16.28l-3.57-3.57A5 5 0 0 0 13 7.1zM12 17a5 5 0 0 1-1-9.9v-5a10 10 0 1 0 7.33 17.69l-3.57-3.57A5 5 0 0 1 12 17z" /></svg>;
  }

}