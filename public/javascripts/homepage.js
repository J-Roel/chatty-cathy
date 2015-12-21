
var disableButton = function(){
  $('.button').disabled=true;
};

$('#create-button').on('click', function() {
  var keyCode = eightDig();
  $('#create-button').text(keyCode);
    $(this).prop('disabled', true);
    $('#emailInput').show();
    $('#createChatSubmit').show();
  $('#create-button').css({'color':'#66CD00'});
  //$('#create-button').replaceWith("<p class='keyField'>" + keyCode + "</p>")
});

$('#join-button').on('click', function() {
  $(this).prop('disabled', true);
  $('#keyCodeInput').show();
  $('#joinChatSubmit').show();
});

var eightDig = function() {
  var code = [];
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < array.length - 2; i++) {
    code.push(random(array));

  }

  var keyCode = code.toString();
  keyCode = keyCode.replace(/,/g, '');
  console.log(keyCode);
  return keyCode;
};


var random = function(x) {
  var item = x[Math.floor(Math.random() * x.length)];
  // console.log(item);
  return item;
};

exports.key = function(){
  return keyCode;
};
