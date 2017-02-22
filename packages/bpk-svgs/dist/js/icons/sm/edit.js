import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M14 6.8l1.4-1.4c.8-.8.8-2 0-2.8s-2-.8-2.8 0L11.2 4 14 6.8zm-3.6-2l-7.5 7.5-.9 3.1c-.1.4.2.7.6.6l3.2-.9 7.5-7.5-2.9-2.8z" /></svg>;
  }

}