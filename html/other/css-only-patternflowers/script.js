const colorPalettes = [
  ["#f69524", "#003583", "#f6f0e2"],
  ["#5c811a", "#0d1b06", "#fef0d6"],
  ["#f9ae08", "#b80028", "#fef1e1"],
  ["#7d8985", "#33313e", "#f6ebd9"],
  ["#2cb0c9", "#0b1a79", "#f4f0e0"],
  ["#d693bd", "#8a0651", "#ffffff"],
  ["#01b6ad", "#0a4958", "#fcfefe"],
  ["#e4491c", "#003246", "#fef0d6"]
];

const rootElement = document.querySelector(":root");
let counter = 0;

document.querySelector("body").addEventListener("click", function () {
  const selectedColorPalette = colorPalettes[counter];

  selectedColorPalette.forEach(function (item, index) {
    let colorVariable = `--c${index + 1}`;
    rootElement.style.setProperty(colorVariable, item);
  });

  if (counter === colorPalettes.length - 1) {
    counter = 0;
  } else {
    counter = counter + 1;
  }
});