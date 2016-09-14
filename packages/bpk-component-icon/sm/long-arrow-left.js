import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.5 7.5H9V5.3c0-1-1-1.6-1.7-1.1L1.6 7.9c-.7.5-.7 1.6 0 2.1l5.7 3.8c.7.5 1.7-.1 1.7-1.1v-2.2h6.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" /></svg>;
  }

}