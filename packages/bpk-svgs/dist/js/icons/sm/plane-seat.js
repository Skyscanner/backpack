import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M5 10V5H3v5c0 2.8 2.2 5 5 5h2v-2H8c-1.7 0-3-1.3-3-3z" /><circle cx="7.5" cy="2.5" r="1.5" /><path d="M14.7 15.5L12.2 10H9V5H6v5c0 1.1.9 2 2 2h2.9l2 4.3c.2.4.5.6.9.6.1 0 .3 0 .4-.1.5-.2.7-.8.5-1.3z" /></svg>;
  }

}