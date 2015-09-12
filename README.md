[![Build Status](https://travis-ci.org/ideal-react/auto-ellipsis.svg)](https://travis-ci.org/ideal-react/auto-ellipsis)

# auto-ellipsis

> auto-ellipsis is a React component for truncation when content overlength.

## install

> npm install auto-ellipsis

## build

Auto-ellipsis use [css-modules][1] to resolve `css in react`. So you may use some plugin to deal with `css-modules`. If you use webpack, you just need use css-loader: `css-loader?modules`.

## custom UI

Auto-ellipsis use [react-css-modules][2], i have a PR for custom UI (before merge, use `ideal-react/react-css-modules#dev` source). This PR is make custom UI possible. We can use `css-loader?modules&localIdentName=[local]-[hash:base64:5]` in dev, then we can base `[local]` to set our own styles.
You set your own styles, pass styles as props to component. More check example.

## principle

Auto-ellipsis use DOM Range to compute the suitable endPoint. Range is a dom element, so we continually compare `dom bottom` with `Range bottom(dom is container)` from the back forward. Finally, we find the position suit: `dom Range bottom <= dom bottom`.

## demo

See [demo][3].

## LICENSE

MIT.


[1]: https://github.com/css-modules/css-modules
[2]: https://github.com/gajus/react-css-modules
[3]: http://ideal-react.github.io


