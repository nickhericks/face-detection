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
	canvas.width = video.videowidth;
	canvas.height = video.videheight;
	faceCanvas.width = video.videowidth;
	faceCanvas.height = video.videheight;
}

async function detect() {
	const faces = await faceDetector.detect(video);
	console.log(faces);

}

populateVideo().then(detect);
