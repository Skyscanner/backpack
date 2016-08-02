import 'bpk-stylesheets/base.scss'

export default ({ head = {}, html = '', assets = {} }) => {
  return `<!doctype html>

<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  ${head.title.toString()}
  <link rel="stylesheet" href="/${assets.docs.css}">
</head>

<body>

<div id="react-mount">
  ${html}
</div>

<script src="/${assets.docs.js}" async></script>

</body>

</html>`
}
