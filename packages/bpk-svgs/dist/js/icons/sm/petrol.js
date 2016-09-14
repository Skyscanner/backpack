import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M14 9V6.7C14 5.2 12.8 4 11.3 4H11V3c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14h8V9h1v4.3c0 .4.3.7.7.7h1.6c.4 0 .7-.3.7-.7V10l-1-1zM9 7H5V3h4v4zm5 6h-1v-3h.6l.4.4V13z" /></svg>;
  }

}