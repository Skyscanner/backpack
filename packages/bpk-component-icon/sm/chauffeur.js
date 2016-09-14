import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M4 15c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1H4v1zm9.1-10c.8 0 1.5-.7 1.5-1.5S13.9 2 13.1 2s-1.5.7-1.5 1.5.6 1.5 1.5 1.5zM13 7l1-1h-2l1 1zm2.5-.6L13 9.6l-2.3-3-.1-.1c-.2 0-.4.1-.5.2L7.6 9.5c-.2-.1-.3-.3-.6-.4L6 5.8C5.8 4.8 4.9 4 3.8 4H2v1h1.8c.6 0 1.2.4 1.3 1L6 9H2v4h6v-1.7l3-2.8.4 2.9.1.5.5 4.1h2l.6-4.6h.4c.2 0 .4-.2.4-.4l.6-3.2c.1-.5-.1-1-.5-1.4zM5 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" /></svg>;
  }

}