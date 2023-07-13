// Setting varibale
const record = document.getElementById("record_btn"); // getting record_btn as id
const stop = document.getElementById("stop_btn");

stop.style.display = "none"; // initially stop button should not be displayed, We should show stop button only when recording started

// function for getting userMedia like microphone or web cam video
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

  // getUserMedia will return promise so to get actual returned result(stream) we need to use then and get actual result(stream) and pass it into OnSucess fucntion
  getMedia(constraints).then((stream) => {
    onSuccess(stream);
  });

  // Main Function
  function onSuccess(Stream) {
    const mediaRecorder = new MediaRecorder(Stream); // MediaStreaming Recordng API new Object

    // After clicking record button
    record.onclick = function () {
      record.style.display = "none";
      stop.style.display = "inline";

      mediaRecorder.start();
      console.log(mediaRecorder);
    };

    // After clicking stop button
    stop.onclick = function () {
      record.style.display = "inline";
      stop.style.display = "none";
      mediaRecorder.stop();
      console.log(mediaRecorder);
    };

    mediaRecorder.onstop = function (e) {
      const audio = document.createElement("audio");
      // const p = document.createElement("p");
      // p.innerHTML = "This is a paragraph.";

      audio.setAttribute("controls", "");

      audio.controls = true;
      const blob = new Blob(audio_chunks, { type: "audio/ogg; codecs=opus" });
      console.log(blob);
      // audio_chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      document.getElementById("main_section").appendChild(audio);
    };

    // if data is available in our Media Recorder then in here we push to audio_chunks array data is on BLOB data types
    mediaRecorder.ondataavailable = function (e) {
      audio_chunks.push(e.data);
      console.log(audio_chunks);
    };
  }
} else {
  console.log("getUserMedia not supported on your browser!");
}
