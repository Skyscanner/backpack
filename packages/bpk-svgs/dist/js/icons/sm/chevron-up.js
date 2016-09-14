import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M17 11.5c0-.4-.2-.8-.5-1.1l-5.2-4.5C10 4.7 8 4.7 6.7 5.8l-5.2 4.6c-.6.5-.7 1.5-.1 2.1.5.6 1.5.7 2.1.1l5.2-4.5c.1-.1.5-.1.6 0l5.2 4.5c.6.5 1.6.5 2.1-.1.3-.3.4-.6.4-1z" /></svg>;
  }

}