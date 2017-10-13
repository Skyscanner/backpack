import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M22 9V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v3c1.7 0 3 1.3 3 3s-1.3 3-3 3v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3c-1.7 0-3-1.3-3-3s1.3-3 3-3zm-5.2-.8l-2.3 2.3 1.2 5.2c.1.2 0 .3-.1.4l-.3.3c-.2.2-.5.2-.7 0 0 0 0-.1-.1-.1l-1.8-4-2.1 2.1.4 1.3c0 .2 0 .3-.1.4l-.7.8-.9-2.4-2.3-.7.8-.7c.2-.1.3-.2.5-.1l1.3.4 2.1-2.1-4-1.8c-.3-.1-.4-.4-.2-.6 0 0 0-.1.1-.1l.3-.3c.1-.1.3-.2.4-.1l5.1 1.1 2.4-2.3c.3-.3.8-.3 1.1 0s.2.7-.1 1z" /></svg>;
  }

}