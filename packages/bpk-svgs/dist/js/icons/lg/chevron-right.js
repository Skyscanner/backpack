import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M18.6 12l-8.1-9.4c-.7-.8-2-.9-2.8-.2s-.9 2-.2 2.8l5.5 6.4c.1.1.1.5 0 .6l-5.5 6.4c-.7.8-.6 2.1.2 2.8.3.4.8.6 1.3.6s1.1-.2 1.5-.7l8.1-9.3z" /></svg>;
  }

}