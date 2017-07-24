import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 7c1.1 0 2 .8 2 2s-.9 2-2 2h-.1c-1.1 0-2-.9-2-2 .2-1.1 1-2 2.1-2zm11 10.3c0 .4-.3.7-.7.7H4.7c-.4 0-.7-.3-.7-.7V12l3.8 3.8L6.7 17h1l.7-.7 6.2-6.2c.5-.5 1.4-.5 1.9 0l3.6 3.6v3.6z" /></svg>;
  }

}