import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M5 5.439v8.873c0 .795.644 1.439 1.439 1.439H7V4h-.561C5.644 4 5 4.644 5 5.439z" /><circle cx="12.5" cy="15.5" r="1.5" /><path d="M12.5 12.678c.171 0 .337.021.5.05V4h-.008V2.182c0-.652-.529-1.182-1.181-1.182h-1.329a.532.532 0 1 0 0 1.064h1.329a.121.121 0 0 1 .119.119V4H8.64v11.75h1.063l-.025-.25a2.821 2.821 0 0 1 2.82-2.822h.002z" /></svg>;
  }

}