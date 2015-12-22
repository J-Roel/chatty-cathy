var disableButton = function() {
  $('.button').disabled = true;
};

$('#create-button').on('click', function() {
  var keyCode = eightDig();
  console.log(keyCode);
  $('#create-button').val(keyCode);
  $('#hRoomCode').val(keyCode);
  $(this).prop('disabled', true);
  $('#emailInput').slideDown('fast');
  $('#createChatSubmit').slideDown('fast');
  $('#create-button').css({
    'color': '#66CD00'
  });

  $('#createChatSubmit').on('click', function() {
    console.log(keyCode);

  });
});


$('#join-button').on('click', function() {
  $(this).prop('disabled', true);
  $('#keyCodeInput').slideDown();
  $('#joinChatSubmit').slideDown();
});

//KEYCODE
var eightDig = function() {
  var code = [];
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < array.length - 2; i++) {
    code.push(random(array));

  }

  var keyCode = code.toString();
  keyCode = keyCode.replace(/,/g, '');

  return keyCode;

};

var random = function(x) {
  var item = x[Math.floor(Math.random() * x.length)];
  return item;
};
