import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20.58 2L16 6.62A4 4 0 0 0 8 7H7v8.58l-2 2V7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 1.62 2L2 20.58l.71.71L21.29 2.71zM12 5a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zm8 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1V7M7 18.41l10-10V19H7z" /></svg>;
  }

}