import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M15.1 14.9c-3-.5-5.5-3-6-6-.4-2.5.3-4.7 1.8-6.4.1-.2 0-.4-.2-.4-5.1.7-8.9 5.1-8.7 10.4.2 5.1 4.4 9.3 9.5 9.5 5.3.2 9.7-3.6 10.4-8.7 0-.2-.2-.4-.4-.2-1.6 1.4-3.9 2.2-6.4 1.8z" /></svg>;
  }

}