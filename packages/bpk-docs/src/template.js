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
  <link rel="apple-touch-icon" sizes="180x180" href="../../img/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="../../img/favicons/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="../../img/favicons/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="../../img/favicons/manifest.json">
  <link rel="mask-icon" href="../../img/favicons/safari-pinned-tab.svg" color="#fd5250">
  <meta name="theme-color" content="#40c4df">
</head>

<body>

<div id="react-mount">
  ${html}
</div>

<script src="/${assets.docs.js}" async></script>

</body>

</html>`
}
