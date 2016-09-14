import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M2.5 14h13.1c1.3 0 1.9-1.5 1.1-2.4l-6.6-7.1c-.6-.7-1.6-.7-2.2 0l-6.5 7.1c-.9.9-.2 2.4 1.1 2.4z" /></svg>;
  }

}