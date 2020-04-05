const video = document.querySelector('.webcam');

// canvas for finding face
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

// canvas for adding face blur
const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

// this is the experimental feature within Chrome
const faceDetector = new window.FaceDetector(
	{ fastMode: true }
);

// console.log(video, canvas, faceCanvas, faceDetector);

//write a function that will populate the user's video
async function populateVideo() {
	// grab feed from user's web cam
	const stream = await navigator.mediaDevices.getUserMedia({
		video: { width: 1280, height: 720 }
	})

	video.srcObject = stream;
	await video.play();

	// size the canvases to be the same size as the video
	// this will allow us to line everything up when applying the face blur
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	faceCanvas.width = video.videoWidth;
	faceCanvas.height = video.videoHeight;
}

async function detect() {
	const faces = await faceDetector.detect(video);
	// console.log(faces);

	// in order to detect the face over and over again, we want to repeatedly call detect. We could use setInterval for this but that will run it on a set time, instead of when the computer running it is actually ready. 
	// requestAnimationFrame allows us to have the browser tell us when it is ready to update the frame, then do something when it is ready.
	// ask browser when the next animation frame is and tell it to run detect for us
	faces.forEach(drawFace);
	requestAnimationFrame(detect);
}

function drawFace(face) {
	// console.log(face);
	const { width, height, top, left } = face.boundingBox;
	console.log( {width, height, top, left} );
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = "#ffc600";
  ctx.lineWidth = 2;
	ctx.strokeRect(left, top, width, height);
}

populateVideo().then(detect);
