import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M12 16.4c0 1.2-1.2 2-2.2 1.4l-7.2-4.5c-.9-.6-.9-2 0-2.5l7.2-4.5c1-.6 2.2.2 2.2 1.4V10h8c1.1 0 2 .9 2 2s-.9 2-2 2h-8v2.4z" /></svg>;
  }

}