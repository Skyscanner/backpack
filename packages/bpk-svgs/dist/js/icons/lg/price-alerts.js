import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10 19.1h4.8c-.6 1.5-2.3 2.3-3.9 1.7-.8-.3-1.4-.9-1.7-1.7h.8zm8-8c0-2.5-1.6-4.8-4-5.7.2-1.1-.5-2.1-1.6-2.3-1.1-.2-2.1.5-2.3 1.6v.7C7.7 6.2 6 8.5 6 11v3l-2 3h16l-2-3v-2.9z" /></svg>;
  }

}