import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M5.016 11.295a6.888 6.888 0 01-2.172-5.298 4.128 4.128 0 011.23-2.716l1.674 1.675 4.171 4.171-3.535 3.536-1.368-1.368zm8.44 1.37l1.421-1.421.707.707a1 1 0 001.415 0l.109-.11.598-.597L22 6.95l-.707-.707-4.294 4.294-1.415-1.414 4.294-4.295-.707-.707-4.294 4.294-1.414-1.414 4.294-4.294L17.05 2l-4.294 4.294-.598.598-.11.11a1 1 0 000 1.413l.708.708-1.42 1.42-.003-.001-2.12 2.12.001.003-5.626 5.626a1.5 1.5 0 102.121 2.121l5.626-5.626 5.494 5.493a1.5 1.5 0 002.121-2.12z" /></svg>);