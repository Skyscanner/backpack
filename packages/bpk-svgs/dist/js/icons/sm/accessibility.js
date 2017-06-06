import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm0-18a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm.07 1a1.59 1.59 0 1 1-1.55 1.59A1.57 1.57 0 0 1 12.07 5zm1.6 5.51v3l1.43 4.62a.45.45 0 0 1-.79.45l-2.31-5-2.35 5a.47.47 0 0 1-.65.11.44.44 0 0 1-.11-.62l1.46-4.6V10.4l-4.1-1.3A.45.45 0 0 1 6 8.71a.49.49 0 0 1 .25-.42.75.75 0 0 1 .48 0L12 9.2l5.29-.89h.2a.45.45 0 0 1 .48.28.46.46 0 0 1-.17.53z" /></svg>;
  }

}