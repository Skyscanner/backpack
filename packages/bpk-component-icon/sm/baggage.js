import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M12 5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v1H5v9h8V6h-1V5zM8 5h2v1H8V5zM1 7.5v6c0 .825.675 1.5 1.5 1.5H4V6H2.5C1.675 6 1 6.675 1 7.5zM15.5 6H14v9h1.5c.825 0 1.5-.675 1.5-1.5v-6c0-.825-.675-1.5-1.5-1.5z" /></svg>;
  }

}