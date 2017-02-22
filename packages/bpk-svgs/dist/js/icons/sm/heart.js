import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M15.1 4.4c-1.2-1.5-3.3-1.8-4.8-.7-.6.4-1 1-1.2 1.5 0 .1-.1.1-.1 0-.3-.6-.7-1.1-1.3-1.5-1.5-1.1-3.6-.8-4.8.7-1.3 1.6-1.2 4 .2 5.5l5.2 5.8c.4.5 1.1.5 1.5 0L15 9.9c1.3-1.5 1.4-3.9.1-5.5z" /></svg>;
  }

}