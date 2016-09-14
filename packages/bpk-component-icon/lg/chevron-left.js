import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M15 22c-.5 0-1.1-.2-1.5-.7L8 14.9C6.6 13.3 6.6 10.7 8 9l5.5-6.4c.7-.8 2-.9 2.8-.2.8.7.9 2 .2 2.8L11 11.7c-.1.1-.1.5 0 .6l5.5 6.4c.7.8.6 2.1-.2 2.8-.3.3-.8.5-1.3.5z" /></svg>;
  }

}