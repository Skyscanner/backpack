import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M19.9 5.8c-1.5-2-4.2-2.3-6.2-.9-.7.5-1.2 1.2-1.6 2 0 .1-.1.1-.2 0-.3-.8-.8-1.5-1.6-2-2-1.4-4.7-1-6.2.9-1.6 2-1.5 5.2.3 7.1l7 7.8c.3.4.9.4 1.3 0l7-7.8c1.7-1.9 1.8-5.1.2-7.1z" /></svg>;
  }

}