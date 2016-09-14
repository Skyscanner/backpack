import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M14.1 8.6c-1.1.3-2.3.3-3.4-.1L2.5 5.3c-.4-.2-.6-.7-.4-1.1.2-.4.8-.7 1.2-.5l4.1 1.6 4.4-3.1c.4-.3.9-.3 1.3-.1l.4.2c.2.1.2.3.1.4L10 6.4l2.9 1.1 1.5-.9c.1-.1.3-.1.4 0l1 .4c.2.1.2.3.1.4l-1.3.9c-.1.1-.3.2-.5.3zm-7.9 4.9l4.2 2.4c.4.2.9-.1.9-.5V14H15c.6 0 1-.4 1-1s-.4-1-1-1h-3.8v-1.4c0-.4-.5-.7-.9-.5l-4.2 2.4c-.3.2-.3.8.1 1z" /></svg>;
  }

}