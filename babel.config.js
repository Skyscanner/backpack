module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ],
  // ignore: [/packages\/bpk-stylesheets\/node_modules\/(?!bpk)/],
  include: path => {
    console.log(path);
    return true;
  },
};
