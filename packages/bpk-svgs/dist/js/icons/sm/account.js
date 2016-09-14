import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M2.074 15c.406-2.127 1.613-3.83 3.376-5.113l.75-.544A1.798 1.798 0 0 1 7.256 9h3.484c.383 0 .755.121 1.065.346l.745.542c1.763 1.283 2.969 2.986 3.376 5.113v.198a.802.802 0 0 1-.802.802H2.876a.802.802 0 0 1-.802-.802V15zM9 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>;
  }

}