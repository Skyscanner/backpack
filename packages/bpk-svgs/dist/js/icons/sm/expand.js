import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M12.5 11.3c.4.4 1 .4 1.4 0L19 6.2V9c0 .6.4 1 1 1s1-.4 1-1V4c0-.6-.4-1-1-1h-5c-.6 0-1 .4-1 1s.4 1 1 1h2.4l-4.9 4.9c-.4.4-.4 1 0 1.4zm-1 1.4c-.4-.4-1-.4-1.4 0L5 17.8V15c0-.6-.4-1-1-1s-1 .4-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1s-.4-1-1-1H6.6l4.9-4.9c.4-.4.4-1 0-1.4z" /></svg>;
  }

}