import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M16 5c.5 0 1-.5 1-1s-.5-1-1-1H8c-.5 0-1 .5-1 1s.5 1 1 1h2v1.3c-3.4.9-6 4-6 7.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.7-2.6-6.8-6-7.7V5h2zm-.9 12.1c-.2.2-.5.3-.7.3s-.5-.1-.7-.3L11.6 15c-.4-.4-.6-.9-.6-1.4V10c0-.6.4-1 1-1s1 .4 1 1v3.6l2.1 2.1c.4.4.4 1 0 1.4z" /></svg>;
  }

}