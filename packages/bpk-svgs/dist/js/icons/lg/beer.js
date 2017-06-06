import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M15 5V2.5c0-.3-.2-.5-.5-.5h-10c-.3 0-.5.2-.5.5V20c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-5c2.8 0 5-2.2 5-5s-2.2-5-5-5zM6 18.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-14c0-.3.2-.5.5-.5s.5.2.5.5v14zm2 0c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-14c0-.3.2-.5.5-.5s.5.2.5.5v14zm2 0c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-14c0-.3.2-.5.5-.5s.5.2.5.5v14zm5-5.5V7c1.7 0 3 1.3 3 3s-1.3 3-3 3z" /></svg>;
  }

}