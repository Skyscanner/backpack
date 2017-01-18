import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M9 1C4.6 1 1 4.6 1 9s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm2 13H7v-1h4v1zm2.5-5H11v3H7V9H4.5c-.4 0-.7-.5-.4-.8l4.5-5c.2-.2.6-.2.8 0l4.5 5c.3.3 0 .8-.4.8z" /></svg>;
  }

}