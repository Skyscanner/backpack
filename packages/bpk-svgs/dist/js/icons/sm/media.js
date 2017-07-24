import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M20.5 8h-5.9l3.5-3.5c.3-.4.3-.9-.1-1.2-.3-.3-.8-.3-1.2 0L12.1 8h-.9L6.5 3.3c-.4-.4-.9-.3-1.2 0-.3.3-.3.8 0 1.2L8.8 8H3.5C2.7 8 2 8.7 2 9.5v9c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-9c0-.8-.7-1.5-1.5-1.5zM18 17.6c0 .2-.2.4-.5.4h-13c-.3 0-.5-.2-.5-.4v-7.2c0-.2.2-.4.5-.4h13.1c.3 0 .5.2.5.4v7.2zm2.5-2.6h-1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1c.3 0 .5.2.5.5s-.2.5-.5.5zm-.5-3c-.5 0-1-.4-1-1s.5-1 1-1 1 .4 1 1-.5 1-1 1z" /></svg>;
  }

}