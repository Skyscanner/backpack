import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M6 22H4V3c0-.6.4-1 1-1s1 .4 1 1v19zM19.5 3H7v10h12.5c.4 0 .7-.5.4-.8L16 8l3.9-4.2c.3-.3 0-.8-.4-.8z" /></svg>;
  }

}