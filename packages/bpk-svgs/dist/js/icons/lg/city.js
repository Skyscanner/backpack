import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M19 12h-4V6l-3-3-3 3v2H5c-1.1 0-2 .9-2 2v11h18v-7c0-1.1-.9-2-2-2zM8 19.8H6v-2h2v2zM8 16H6v-2h2v2zm0-4H6v-2h2v2zm5 7.8h-2v-2h2v2zm0-3.8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2zm5 11.8h-2v-2h2v2zm0-3.8h-2v-2h2v2z" /></svg>;
  }

}