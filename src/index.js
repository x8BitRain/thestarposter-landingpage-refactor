function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images_old', true, /\.(png|jpe?g|svg)$/));