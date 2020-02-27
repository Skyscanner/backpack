import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="null" height="null" style={{
  width: "3.5rem/3",
  height: "3.5rem/3"
}} {...props}><path d="M12.7 14c0 .3.2.5.5.5h.5l.9 6.5h1.9l.9-6.5h.5c.3 0 .5-.2.5-.5l.6-4.9C19.2 8 18.2 7 17.1 7h-3.2c-1.1 0-2 1-1.9 2.1l.7 4.9zm2.8-8c.8 0 1.5-.7 1.5-1.5S16.3 3 15.5 3 14 3.7 14 4.5 14.7 6 15.5 6zM9.9 17l-.5 4H7.5L7 17H5c-.6 0-.8-.4-.5-.9l2-4.1-.4-3c-.1-1.1-.3-2 .8-2h3.2c1.1 0 .9.9.8 2l-.4 3 2.1 4.1c.2.5 0 .9-.5.9H9.9zM8.5 6c.8 0 1.5-.7 1.5-1.5S9.3 3 8.5 3 7 3.7 7 4.5 7.7 6 8.5 6z" /></svg>);