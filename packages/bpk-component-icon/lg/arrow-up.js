import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M3.8 18h16.3c1.6 0 2.4-1.7 1.4-2.9l-8.2-8.6c-.7-.8-2-.8-2.7 0l-8.2 8.6c-1 1.2-.1 2.9 1.4 2.9z" /></svg>;
  }

}