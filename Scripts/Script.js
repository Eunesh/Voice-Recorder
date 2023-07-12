// Setting varibale
const record = document.getElementById("record_btn"); // getting record_btn as id
const stop = document.getElementById("stop_btn");

stop.style.display = "none"; // initially stop button should not be displayed, We should show stop button only when recording started

// function for getting userMedia
async function getMedia(constraints) {
  try {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (err) {
    console.log(err);
  }
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedaia Supported");
  let constraints = { audio: true };
  let audio_chunks = []; // initializing  audio_chunks as emmpty array

  getMedia(constraints).then((stream) => {
    onSuccess(stream);
  });

  function onSuccess(Stream) {
    const mediaRecorder = new MediaRecorder(Stream); // MediaStreaming Recordng API new Object

    record.onclick = function () {
      record.style.display = "none";
      stop.style.display = "inline";

      mediaRecorder.start();
      console.log(mediaRecorder);
    };

    stop.onclick = function () {
      record.style.display = "inline";
      stop.style.display = "none";
      mediaRecorder.stop();
      console.log(mediaRecorder);
    };
  }
} else {
  console.log("getUserMedia not supported on your browser!");
}
