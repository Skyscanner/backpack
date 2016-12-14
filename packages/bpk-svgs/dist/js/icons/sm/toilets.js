import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9.5 9.9c0 .2.1.3.3.3h.3l.7 4.7h1.4l.7-4.7h.3c.2 0 .3-.1.3-.3l.5-3.5c.1-.8-.5-1.6-1.4-1.6h-2.3c-.8.1-1.4.8-1.3 1.6l.5 3.5zM11.5 4.2c.6 0 1.1-.5 1.1-1.1S12.1 2 11.5 2c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1zM7.3 12.1L6.9 15H5.6l-.3-2.9H3.5c-.3 0-.4-.2-.3-.4l1.6-3.2-.3-2.2c0-.8-.2-1.4.6-1.4h2.3c.8 0 .7.6.5 1.4l-.2 2.2 1.6 3.2c.1.2 0 .4-.3.4H7.3zM6.2 4.2c.6 0 1.1-.5 1.1-1.1S6.8 2 6.2 2s-1 .5-1 1.1.5 1.1 1 1.1z" /></svg>;
  }

}