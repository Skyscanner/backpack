import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...this.props}><path d="M9.003 1a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm4.373 5.778l-4.927 5.624a1.03 1.03 0 0 1-1.45.099L4.68 10.517a.516.516 0 0 1-.05-.727l.675-.777a.515.515 0 0 1 .726-.051l1.388 1.175a.206.206 0 0 0 .291-.02l4.116-4.697a.514.514 0 0 1 .725-.05l.001.001.775.678c.214.19.236.515.049.729z" /></svg>;
  }

}