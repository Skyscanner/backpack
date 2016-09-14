import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M13.6 3.1A6.03 6.03 0 0 0 9 1c-1.7 0-3.4.7-4.6 2.1-2.1 2.4-1.8 5.9.5 8.4l3.6 4.3c.1.1.3.2.5.2s.4-.1.5-.2l3.6-4.3c2.3-2.5 2.6-6 .5-8.4zm-3 5.5c-.4.4-1 .6-1.6.6S7.8 9 7.4 8.6c-.4-.4-.6-1-.6-1.6 0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2c0 .6-.2 1.2-.6 1.6z" /></svg>;
  }

}