import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M9.9 9.7c.6.7 1.6.9 2.4.6v1.5L15 9.2l1.4-.5c.5-.2.7-.6.6-1-.1-.4-.6-.6-1-.4l-4.2 1.6L9.9 8l-1.2.4 1.2 1.3z" /><path d="M6.7 7l2.6-3.5c.2-.2.1-.5-.2-.5H1.3c-.2 0-.4.3-.2.5L3.7 7v6H1v2h16v-2H6.7V7z" /></svg>;
  }

}