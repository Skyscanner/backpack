export const extractAssets = ({ compilation }) => {
  const assets = {}
  const { chunks } = compilation || []

  chunks.map(({ name, files = [] }) => {
    assets[ name ] = {}

    files.forEach((path) => {
      switch (true) {
        case /\.js$/.test(path):
          assets[ name ].js = path
          break
        case /\.css$/.test(path):
          assets[ name ].css = path
          break
        default:
          break
      }
    })
  })

  return assets
}
