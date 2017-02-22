import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M13.5 11c-.6 0-1.2.2-1.6.6L7 9.1v-.2l4.9-2.5c.4.4 1 .6 1.6.6C14.9 7 16 5.9 16 4.5S14.9 2 13.5 2 11 3.1 11 4.5v.1L6.1 7.1c-.4-.4-1-.6-1.6-.6C3.1 6.5 2 7.6 2 9s1.1 2.5 2.5 2.5c.6 0 1.2-.2 1.6-.6l4.9 2.5v.1c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" /></svg>;
  }

}