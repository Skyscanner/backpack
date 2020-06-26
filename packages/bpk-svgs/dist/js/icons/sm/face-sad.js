import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm-3 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 16.5c.84 0 1.205.326 1.94 1.06a1.5 1.5 0 0 0 2.12-2.12l-.039-.04c-.765-.766-1.898-1.9-4.021-1.9s-3.256 1.134-4.021 1.9l-.04.04a1.5 1.5 0 0 0 2.122 2.12c.734-.734 1.098-1.06 1.939-1.06z" clipRule="evenodd" /></svg>);