import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 16l-5.4-4.8a1 1 0 0 1-.1-1.5 1.12 1.12 0 0 1 1.6-.1L12 13l3.9-3.5a1.13 1.13 0 1 1 1.5 1.7z" /></svg>;
  }

}