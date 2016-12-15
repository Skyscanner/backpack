import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M15.406 5.346a.999.999 0 0 0-1.414 0l-1.768 1.768-1.415-1.415 1.768-1.768a.999.999 0 1 0-1.414-1.414L9.395 4.285 7.981 2.871 4.634 6.218a3.256 3.256 0 0 0-.17 4.412l-2.163 2.163 2.828 2.828 2.163-2.163a3.255 3.255 0 0 0 4.412-.169l3.347-3.347-1.414-1.414 1.768-1.768a1 1 0 0 0 .001-1.414z" /></svg>;
  }

}