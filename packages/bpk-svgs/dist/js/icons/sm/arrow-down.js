import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M14.8 6.9L9 12.5 3.2 6.9c-.4-.5-.1-1.4.5-1.4h10.5c.7 0 1 .9.6 1.4z" /></svg>;
  }

}