import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 4C9.8 4 8 5.8 8 8H7v12h10V8h-1c0-2.2-1.8-4-4-4zm0 2c1.103 0 2 .897 2 2h-4c0-1.103.897-2 2-2zM4 8h1v12H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2zm18 2v8c0 1.1-.9 2-2 2h-1V8h1c1.1 0 2 .9 2 2z" /></svg>;
  }

}