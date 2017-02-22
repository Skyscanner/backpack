import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M15 3h-1c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1H7c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1H3c-.6 0-1 .4-1 1v9.6C2 14.9 3.1 16 4.4 16h9.4c1.2 0 2.3-1 2.3-2.3V4c-.1-.6-.5-1-1.1-1zm0 10.7c0 .7-.6 1.3-1.3 1.3H4.4c-.8 0-1.4-.6-1.4-1.4V7h12v6.7zM4 8h3v3H4V8z" /></svg>;
  }

}