const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCtx = canvas.getContext('2d');

const faceDetector = new window.FaceDetector();

console.log(video, canvas, faceCanvas, faceDetector);

//write a function that will populate the user's video
async function populateVideo() {
	// grab feed from user's web cam
	const stream = await navigator.mediaDevices.getUserMedia({
		video: { width: 1280, height: 720 }
	})

	video.srcObject = stream;
	await video.play();

	// size the canvases to be the same size as the video
	
}

populateVideo();