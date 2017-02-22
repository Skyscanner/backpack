import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M11.6 14.5l3.8-4c.8-.9.8-2.2 0-3.1l-3.8-4c-.6-.5-1.5-.6-2.1 0s-.7 1.5-.1 2.1l1.9 2H3.5C2.7 7.5 2 8.2 2 9s.7 1.5 1.5 1.5h7.8l-1.9 2c-.3.3-.4.7-.4 1 0 .4.2.8.5 1.1.6.6 1.5.5 2.1-.1z" /></svg>;
  }

}