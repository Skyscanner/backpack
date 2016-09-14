import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M11.7 2c-5 .2-9.3 4.2-9.6 9.3-.3 4.3 2.1 8 5.7 9.7 1.3.6 2.8-.4 2.8-1.8V14H8.3c-1 0-1.6-1-1.1-1.7L11 6.5c.5-.7 1.6-.7 2.1 0l3.7 5.7c.5.7-.1 1.7-1.1 1.7h-2.2v5.2c0 1.5 1.5 2.5 2.8 1.8 3.3-1.6 5.7-5 5.7-9C22 6.4 17.3 1.8 11.7 2z" /></svg>;
  }

}