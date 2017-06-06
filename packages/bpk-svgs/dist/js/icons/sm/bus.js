import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M4 21c0 .6.5 1 1 1h2c.5 0 1-.5 1-1v-2H4v2zm12-2v2c0 .6.5 1 1 1h2c.5 0 1-.5 1-1v-2h-4zm4-1V6c0-2.2-1.8-4-4-4H8C5.8 2 4 3.8 4 6v12h16zM6 14.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5S8.3 16 7.5 16 6 15.3 6 14.5zm12 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zM10.5 3h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM6 6c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v6H6V6z" /></svg>;
  }

}