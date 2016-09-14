import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M5.4 4.426a.7.7 0 0 0 .699.699h.776a.52.52 0 0 0 .521-.519v-.002a1.604 1.604 0 1 1 3.208 0v.792C10.604 6.282 9.886 7 9 7H6.204a.804.804 0 0 0-.804.804v8.393c0 .443.36.803.804.803h5.593c.444 0 .804-.36.804-.804v-13.2A1.999 1.999 0 0 0 10.604 1H7.396A1.996 1.996 0 0 0 5.4 2.996v1.43z" /></svg>;
  }

}