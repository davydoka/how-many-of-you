function svgAddAttributes (img, svg) {
  svg.setAttribute('viewBox', img.getAttribute('data-viewBox'));
  svg.setAttribute('preserveAspectRatio', 'none');

  return svg;
}

export {svgAddAttributes};
