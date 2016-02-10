var socket = io();

socket.on('connect', function (){
	console.log('Connected to Socket.io Server!');
});

socket.on('message', function (message){
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New Message');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>')
});

//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	//remove contents of input after user submits form
	$message.val('');
});