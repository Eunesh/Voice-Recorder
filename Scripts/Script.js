async function getPermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedaia Supported");

    const Stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(Stream); // MediaStreaming Recordng API new Object
    return mediaRecorder;
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

function Record() {
  getPermission().then((result) => {
    //   result.start();
    console.log(result);
  });

  //   const elem = document.getElementById("Title");
  //   let TextColor = elem.style.color;
}

function Stop() {
  console.log("Stop THe record");
}
