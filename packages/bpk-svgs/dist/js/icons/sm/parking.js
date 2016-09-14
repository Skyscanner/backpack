import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M9 6.7h-.9v2.1H9c.8 0 1.2-.4 1.2-1.1 0-.8-.4-1-1.2-1zM9 1C4.6 1 1 4.6 1 9s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm.1 9.5h-1V13c0 .6-.4 1-1 1H7c-.6 0-1-.5-1-1V6c0-.6.4-1 1-1h2.1c1.7 0 3.2.6 3.2 2.7 0 1.9-1.5 2.8-3.2 2.8z" /></svg>;
  }

}