import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M16 13H7V7.8l2.8-3.3c.2-.1.2-.3.2-.5 0-.5-.4-1-1-1H2c-.8 0-1.3.9-.8 1.5L4 7.8V13H2c-.5 0-1 .4-1 1 0 .5.4 1 1 1h14c.5 0 1-.4 1-1s-.4-1-1-1zm1-4.1c-.1-.4-.5-.6-.9-.5l-1.6.3-2.1-2c-.1-.1-.3-.2-.4-.1l-.9.2L12.6 9l-.8.2-.3.1h-.1l-1.3-.9c-.1-.1-.2-.1-.3-.1l-.8.2 1.1 1.5c0 .1.1.1.2.2l.3.1c.8.2 1.7.3 2.6.1l3.2-.6c.4-.2.7-.6.6-.9z" /></svg>;
  }

}