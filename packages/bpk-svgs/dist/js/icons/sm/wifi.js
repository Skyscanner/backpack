import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M10.3 13.9c.2-.2.2-.6-.1-.7-.4-.2-.8-.4-1.2-.4s-.9.1-1.2.4c-.2.2-.3.5-.1.7l.9 1c.2.2.5.2.7 0l1-1zM9 10.3c1.1 0 2.1.4 2.9 1.1.2.2.5.1.7 0l1-1c.2-.2.2-.5 0-.7-1.2-1.1-2.8-1.8-4.6-1.8s-3.4.7-4.6 1.8c-.2.2-.2.5 0 .7l1 1c.2.2.5.2.7 0 .8-.6 1.8-1.1 2.9-1.1zm0-4.9c2.4 0 4.6 1 6.2 2.5.2.2.5.2.7 0l1-1c.2-.2.2-.5 0-.7C14.8 4.2 12 3 9 3S3.2 4.2 1.1 6.2c-.1.2-.1.5 0 .7l1 1c.2.2.5.2.7 0C4.4 6.4 6.6 5.4 9 5.4z" /></svg>;
  }

}