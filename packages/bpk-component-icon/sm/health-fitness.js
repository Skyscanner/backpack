import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15 5c.825 0 1 .675 1 1.5V8c.55 0 1 .45 1 1s-.45 1-1 1v1.5c0 .825-.175 1.5-1 1.5M3 5c-.825 0-1 .675-1 1.5V8c-.55 0-1 .45-1 1s.45 1 1 1v1.5c0 .825.175 1.5 1 1.5m4 .5V10h4v3.5a1.5 1.5 0 0 0 3 0v-9a1.5 1.5 0 0 0-3 0V8H7V4.5a1.5 1.5 0 0 0-3 0v9a1.5 1.5 0 0 0 3 0z" /></svg>;
  }

}