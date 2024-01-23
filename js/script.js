$(document).ready(function () {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let savedNumber = 0;

  numbers.forEach(function (number) {
    $("#number-" + number).click(function () {
      let currentValue = $("#text_input").val();
      $("#text_input").val(currentValue + number);
    });
  });

  $("#C_button").click(function () {
    $("#text_input").val("");
  });

  $("#add_button").click(function () {
    let currentValue = $("#text_input").val();
    savedNumber = parseInt(currentValue) + parseInt(savedNumber);
    $("#text_input").val("");
  });

  $("#equals_button").click(function () {
    let currentValue = $("#text_input").val();
    $("#text_input").val(parseInt(currentValue) + parseInt(savedNumber));
  });
});
