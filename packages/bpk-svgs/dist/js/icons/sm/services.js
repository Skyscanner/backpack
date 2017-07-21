import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M10 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5.4 8l.4-2.7C16 8.1 15 7 13.8 7H13l-.8 3.8c-.1.3-.4.3-.5 0L11 7h-.7c-1.2 0-2.1 1.1-2 2.3l.4 2.7h6.7zm3.6 1H5c-.6 0-1 .4-1 1s.4 1 1 1h3l.9 6.1c.1.5.5.9 1 .9h4.2c.5 0 .9-.4 1-.9L16 15h3c.6 0 1-.4 1-1s-.4-1-1-1z" /></svg>;
  }

}