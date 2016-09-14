import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M16 5h-2l-1.4-1.2c-.5-.5-1.3-.8-2-.8H7.1c-.7 0-1.4.3-2 .8L3.8 5H2c-.5 0-1 .5-1 1v8c0 .5.5 1 1 1h14c.5 0 1-.5 1-1V6c0-.5-.5-1-1-1zm-9-.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5zM9 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" /><circle cx="9" cy="10" r="2" /></svg>;
  }

}