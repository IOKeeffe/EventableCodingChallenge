// require "jquery";

function parseTriangle(triangle) {
  console.log("HI!")
  let triangleArray = [];
  $.ajax({
    url: triangle,
    datatype: "text",
  }).then(contents => console.log(contents));

  return triangleArray;
}

document.addEventListener("DOMContentLoaded", () => {
  parseTriangle("file:///Users/ianokeeffe/Desktop/EventableCodingChallenge/triangleInput.js");
});
