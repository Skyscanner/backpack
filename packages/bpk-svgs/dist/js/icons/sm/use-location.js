import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M15 8h-1.1C13.5 6 12 4.5 10 4.1V3c0-.5-.5-1-1-1s-1 .5-1 1v1.1C6 4.5 4.5 6 4.1 8H3c-.5 0-1 .5-1 1s.5 1 1 1h1.1c.4 2 1.9 3.5 3.9 3.9V15c0 .5.5 1 1 1s1-.5 1-1v-1.1c2-.4 3.5-1.9 3.9-3.9H15c.5 0 1-.5 1-1s-.5-1-1-1zm-6 5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" /><circle cx="9" cy="9" r="2" /></svg>;
  }

}