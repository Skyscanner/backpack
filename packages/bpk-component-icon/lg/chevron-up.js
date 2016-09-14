import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M22 15c0-.5-.2-1.1-.7-1.5L14.9 8C13.3 6.6 10.7 6.6 9 8l-6.4 5.5c-.8.7-.9 2-.2 2.8.7.8 2 .9 2.8.2l6.4-5.5c.1-.1.5-.1.6 0l6.4 5.5c.8.7 2.1.6 2.8-.2.4-.3.6-.8.6-1.3z" /></svg>;
  }

}