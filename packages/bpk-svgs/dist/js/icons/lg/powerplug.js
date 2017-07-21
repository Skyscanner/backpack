import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20.7 7.7c-.4-.4-1-.4-1.4 0l-3.2 3.2-2.8-2.8 3.2-3.2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.2 3.2-1.4-1.4-4.3 4.2c-1.6 1.6-1.6 4.1 0 5.7L3.4 18l2.8 2.8L9 18c1.6 1.6 4.1 1.6 5.7 0l4.2-4.2-1.4-1.4 3.2-3.2c.4-.5.4-1.1 0-1.5z" /></svg>;
  }

}