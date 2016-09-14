import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M15.2 3.4c-.1 0-.2 0-.3.1l-3.2 1.6c-.1.1-.2.1-.3.1s-.2 0-.3-.1l-4-2C6.9 3 6.8 3 6.7 3c-.2 0-.3 0-.4.1L2.4 5c-.2.2-.4.4-.4.7v8.1c0 .5.4.8.8.8.1 0 .2 0 .3-.1l3.2-1.6c.1-.1.2-.1.3-.1.1 0 .2 0 .3.1l4 2c.1.1.2.1.3.1s.2 0 .3-.1l3.9-1.9c.3-.1.4-.4.4-.7V4.2c.2-.5-.2-.8-.6-.8zM3 13.5V5.9l3.5-1.8v7.6l-.6.3h-.1L3 13.5zm12-9v7.6l-3.5 1.8V6.3l.6-.3 1.5-.8 1.4-.7z" /></svg>;
  }

}