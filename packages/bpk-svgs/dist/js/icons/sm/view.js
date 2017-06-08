import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M21.7 10.9C19.6 7.9 16 6 12 6s-7.6 1.9-9.7 4.9c-.5.7-.5 1.5 0 2.2C4.4 16.1 8 18 12 18s7.6-1.9 9.7-4.9c.4-.7.4-1.5 0-2.2zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm2-4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" /></svg>;
  }

}