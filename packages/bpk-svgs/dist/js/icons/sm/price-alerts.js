import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M15 14H3l1.3-1.8.4-5.5c.2-2.2 1.3-3.5 3.1-4l-.1-.4C7.7 1.6 8.3 1 9 1s1.3.6 1.3 1.3c0 .2 0 .3-.1.5 1.9.4 3 1.7 3.1 3.9l.4 5.5L15 14zm-6 3c.9 0 1.7-1.1 1.9-2H7.1c.2.9 1 2 1.9 2z" /></svg>;
  }

}