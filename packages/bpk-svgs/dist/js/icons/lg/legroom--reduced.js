import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M9 3a1 1 0 0 0-1 1v8c0 2 1 4 3.5 4h1c.956 0 1.913.915 1.557 1.87-.033.088-.072.175-.102.265L13.5 19.5c-.333.781 0 1.5 1 1.5h3.665c.552 0 1.02-.473.762-.961C18.59 19.405 18 19 17 19c-.123 0-.383-.34-.19-.739.093-.194.239-.359.335-.551l.791-1.583c.043-.084.08-.172.106-.263.396-1.425-.588-2.38-2.042-2.864l-2.833-.677a1 1 0 0 1-.724-.855l-.697-6.454C11.536 3.841 10.653 3 9.628 3H9z" /><path d="M7 6a1 1 0 0 0-2 0v5.636c0 1.876.267 3.726 1.249 5.122C7.284 18.227 8.968 19 11.333 19H12a1 1 0 1 0 0-2h-.667c-1.9 0-2.884-.592-3.449-1.394C7.267 14.73 7 13.397 7 11.636V6z" /></svg>);