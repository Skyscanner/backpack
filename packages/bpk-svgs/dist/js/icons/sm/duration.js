import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9 3c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6m0-1C5.1 2 2 5.1 2 9s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 2.4V9l-2.9 3.1c-.2.2-.2.4 0 .6 1.1.9 2.6 1.4 4.2 1 1.8-.4 3.2-1.8 3.6-3.6.6-3-1.7-5.8-4.5-6-.2-.1-.4.1-.4.3z" /></svg>;
  }

}