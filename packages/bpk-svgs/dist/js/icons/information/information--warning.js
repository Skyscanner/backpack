import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M21.9 19.2L13.1 2.6c-.3-.6-1-.8-1.6-.5-.2.1-.4.3-.5.5L2.2 19.2c-.3.6-.1 1.3.5 1.6.1.2.3.2.5.2h17.6c.7 0 1.2-.5 1.2-1.2l-.1-.6zM12 19c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-5c0 .6-.4 1-1 1s-1-.4-1-1V8c0-.6.4-1 1-1s1 .4 1 1v6z" /></svg>;
  }

}