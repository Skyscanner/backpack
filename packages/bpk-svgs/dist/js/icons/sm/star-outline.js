import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 7.509l-.567 1.206a4.05 4.05 0 0 1-3.059 2.28l-1.529.232 1.228 1.251a4.05 4.05 0 0 1 1.105 3.494l-.263 1.598 1.129-.623a4.05 4.05 0 0 1 3.912 0l1.133.625-.262-1.604a4.05 4.05 0 0 1 1.104-3.488l1.227-1.253-1.532-.232a4.05 4.05 0 0 1-3.06-2.28L12 7.509zm-3.282-.071a1.05 1.05 0 0 1-.793.591l-5.75.87c-.646.098-.904.93-.436 1.407l4.192 4.273c.234.239.34.575.286.906l-.995 6.05c-.11.673.565 1.187 1.142.868l5.129-2.83a1.05 1.05 0 0 1 1.014 0l5.129 2.83c.577.319 1.252-.195 1.142-.868l-.99-6.051a1.05 1.05 0 0 1 .286-.905l4.188-4.274c.467-.477.209-1.308-.437-1.405l-5.75-.87a1.05 1.05 0 0 1-.793-.592L12.706 1.96a.771.771 0 0 0-1.412 0L8.718 7.438z" clipRule="evenodd" /></svg>);