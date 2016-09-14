import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><circle cx="8.998" cy="2.5" r="1.5" /><path d="M6.334 9h5.333l.292-2.188a1.6 1.6 0 0 0-1.376-1.798L10.372 5H10l-.757 3.03c-.063.253-.422.253-.485 0L8 5h-.372a1.6 1.6 0 0 0-1.6 1.6l.014.212L6.334 9zm8.233 1H3.433a.433.433 0 0 0-.433.433v.134c0 .239.194.433.433.433h2.674l.549 5.13c.054.499.375.87.753.87h3.182c.378 0 .699-.371.752-.87l.55-5.13h2.674a.433.433 0 0 0 .433-.433v-.134a.433.433 0 0 0-.433-.433z" /></svg>;
  }

}