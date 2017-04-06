import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M19 4v2h-4V4H9v2H5V4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.5c0 .3-.2.5-.5.5h-13c-.3 0-.5-.2-.5-.5V10h14v8.5zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM8 5H6V3h2v2zm10 0h-2V3h2v2z" /></svg>;
  }

}