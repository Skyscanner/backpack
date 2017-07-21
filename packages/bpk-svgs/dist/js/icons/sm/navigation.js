import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M12.7 11.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3zm9.3.7c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zm-4.6-5.8l-6.1 3.9c-.3.1-.5.2-.7.5-.2.2-.4.4-.5.7l-3.9 6.1c-.1.2.1.5.3.3l6.1-3.9c.3-.1.5-.3.7-.5.2-.2.4-.5.5-.7l3.9-6.1c.2-.1-.1-.4-.3-.3z" /></svg>;
  }

}