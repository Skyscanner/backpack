import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.819 12.383l3.13 3.478a2.3 2.3 0 01-1.71 3.839h-6.26a2.3 2.3 0 01-1.71-3.84l3.13-3.477a2.3 2.3 0 013.42 0zM5.778 9.412c.982 0 1.778.796 1.778 1.778v.856a1.778 1.778 0 01-3.556 0v-.856c0-.982.796-1.778 1.778-1.778zM9.333 5c.982 0 1.778.796 1.778 1.778v.856a1.778 1.778 0 01-3.555 0v-.856C7.556 5.796 8.35 5 9.333 5zm5.334 0c.982 0 1.777.796 1.777 1.778v.856a1.778 1.778 0 11-3.555 0v-.856c0-.982.796-1.778 1.778-1.778zm3.555 4.412c.982 0 1.778.796 1.778 1.778v.856a1.778 1.778 0 11-3.556 0v-.856c0-.982.796-1.778 1.778-1.778z" /></svg>);