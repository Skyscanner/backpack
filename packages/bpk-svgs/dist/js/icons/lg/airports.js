import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M21 18H9V8.8l2.8-3.3c.2-.1.2-.3.2-.5 0-.5-.4-1-1-1H3c-.8 0-1.3.9-.8 1.5L5 8.8V18H3c-.5 0-1 .4-1 1 0 .5.4 1 1 1h18c.5 0 1-.4 1-1s-.4-1-1-1zM7 6h1.8L7.5 7.5l-.5.6-.5-.6L5.2 6H7zm15 6.1c-.1-.6-.8-.9-1.4-.8l-2.4.5-3.1-3c-.2-.2-.4-.2-.6-.2l-1.3.3 2.2 3.5-1.2.2-.5.1h-.1l-2-1.3c-.1-.1-.3-.1-.5-.1l-1.1.3 1.6 2.3c0 .1.1.2.2.2l.5.1c1.3.3 2.6.4 3.9.1l4.8-1c.7 0 1.1-.6 1-1.2z" /></svg>;
  }

}