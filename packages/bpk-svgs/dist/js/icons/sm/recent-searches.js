import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.7 14.3l-4.1-4.1c.6-.8.9-1.8.9-2.9 0-2.9-2.4-5.3-5.3-5.3S2 4.4 2 7.3s2.4 5.2 5.2 5.2c1.1 0 2.1-.3 2.9-.9l4.1 4.1c.4.4 1 .4 1.4 0 .5-.4.5-1 .1-1.4zm-12.4-7c0-2.2 1.8-3.9 3.9-3.9s3.9 1.8 3.9 3.9-1.8 3.9-3.9 3.9-3.9-1.8-3.9-3.9zM8 5v2.5l-.1.3-1.6 1.5c-.1.1-.2.2-.3.2-.1 0-.2 0-.3-.1-.2-.2-.2-.5 0-.7L7 7.3V5c0-.3.2-.5.5-.5s.5.2.5.5z" /></svg>;
  }

}