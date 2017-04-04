import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6.9 14.8c-.4 0-.7-.1-1-.4l-3.6-3.1c-.3-.3-.4-.8-.1-1.1L3.3 9c.2-.3.7-.3 1.1-.1l2.2 1.8c.1.1.3.1.5 0l6.4-7.3c.3-.3.8-.4 1.1-.1l1.2 1.1c.3.3.4.8.1 1.1l-7.7 8.7c-.4.5-.8.6-1.3.6z" /></svg>;
  }

}