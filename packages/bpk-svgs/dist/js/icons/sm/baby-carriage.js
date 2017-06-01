import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><circle cx="6" cy="15" r="1.5" /><circle cx="12" cy="15" r="1.5" /><path d="M7.527 7.5v-6a6 6 0 0 0-6 6zM1.5 8.5h15a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4z" /></svg>;
  }

}