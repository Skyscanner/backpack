import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20.6 18.4l-4.5-4.5c-.1-.1-.1-.1-.2-.1.7-1.1 1.1-2.4 1.1-3.8 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.4 0 2.7-.4 3.8-1.1l.1.2 4.5 4.5c.3.3.7.4 1.1.4s.8-.1 1.1-.4c.5-.6.5-1.6 0-2.2zM5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z" /></svg>;
  }

}