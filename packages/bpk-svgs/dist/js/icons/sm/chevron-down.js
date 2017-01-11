import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9 14.2l7.5-6.6c.6-.5.7-1.5.1-2.1-.5-.6-1.5-.7-2.1-.1L9.3 9.9c-.1.1-.5.1-.6 0L3.5 5.4c-.6-.6-1.6-.5-2.1.1-.3.3-.4.6-.4 1s.2.8.5 1.1L9 14.2z" /></svg>;
  }

}