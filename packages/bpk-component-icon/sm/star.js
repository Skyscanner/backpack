import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9.6 2.4l1.7 3.5c.1.2.3.3.5.4l3.5.6c.7 0 .9.7.5 1.1l-3 2.7c-.2.2-.2.4-.2.6l1.2 3.9c.1.6-.5 1-1 .7l-3.5-2.3c-.2-.1-.4-.1-.6 0l-3.5 2.3c-.5.3-1.1-.2-1-.7l1.2-3.9c0-.2 0-.5-.2-.6L2.2 8c-.4-.4-.2-1.1.4-1.2l3.5-.6c.2 0 .4-.2.5-.4l1.7-3.5c.3-.4 1.1-.4 1.3.1z" /></svg>;
  }

}