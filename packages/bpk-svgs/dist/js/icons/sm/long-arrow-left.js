import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M9.6 4.5L3.9 9.9c-.4.4-.7.9-.8 1.5-.1.2-.1.4-.1.6 0 .2 0 .4.1.6.1.6.4 1.1.8 1.5l5.7 5.3c.8.8 2.1.7 2.8-.1.8-.8.7-2.1-.1-2.8L9.6 14H19c1.1 0 2-.9 2-2s-.9-2-2-2H9.6l2.7-2.5c.5-.4.7-1 .7-1.5s-.2-1-.5-1.4c-.8-.8-2.1-.8-2.9-.1z" /></svg>;
  }

}