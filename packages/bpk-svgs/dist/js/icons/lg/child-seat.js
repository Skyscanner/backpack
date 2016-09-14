import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...this.props}><path d="M17.7 21H7.4C6.1 21 5 19.9 5 18.6c0-1.4 1.2-2.5 2.6-2.4l12.8.8c.3 0 .6.3.6.6v.1c0 1.8-1.5 3.3-3.3 3.3zM3.6 3c-.3 0-.6.3-.5.5l1.6 9.8c.1.8.8 1.4 1.6 1.5l10 .6c.3 0 .5-.2.4-.5l-.3-1.1c-.3-1.3-1.4-2.2-2.6-2.4l-4.9-.7c.1 0-1.1-3.1-2.1-5.4C6.4 3.9 5 3 3.6 3z" /></svg>;
  }

}