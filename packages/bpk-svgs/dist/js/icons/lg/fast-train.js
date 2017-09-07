import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M19.784 19.606l-.3.394H1.991v-2h17a1 1 0 0 1 .793 1.606zM22 12.387A3.635 3.635 0 0 1 18.333 16H1.991L2 6a2 2 0 0 1 2-2h5.835a6.768 6.768 0 0 1 4.235 1.493l7.578 6.173a.932.932 0 0 1 .352.721zM6.391 9h9.218l-2.4-1.956c-.02-.016-.044-.028-.065-.044H6.391zm13.463 4H3.993v1h14.34a1.655 1.655 0 0 0 1.521-1z" /></svg>;
  }

}