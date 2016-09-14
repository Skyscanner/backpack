import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M8.042 14.558l1-4.2 1 4.3c.3 1.3 1.8 2 3 1.3s1.3-2.3.4-3.2l-3.2-3 4.2 1.2c1.3.3 2.6-.7 2.6-2s-1.3-2.3-2.6-1.9l-4.2 1.2 3.2-3c.9-1 .8-2.6-.4-3.2-1.2-.7-2.6-.1-2.9 1.3l-1 4.3-1.1-4.3c-.3-1.3-1.8-2-3-1.3s-1.3 2.3-.4 3.2l3.2 3-4.2-1.2c-1.3-.4-2.6.6-2.6 1.9s1.3 2.3 2.6 1.9l4.2-1.2-3.2 3c-1 .9-.8 2.5.4 3.2s2.6 0 3-1.3z" /></svg>;
  }

}