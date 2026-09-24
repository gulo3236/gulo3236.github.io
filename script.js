/* =========================================================
   PERSONAL COURSE STUDIO
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const imageUpload =
  document.getElementById("imageUpload");

const videoUpload =
  document.getElementById("videoUpload");

const mentorUpload =
  document.getElementById("mentorUpload");

const mainImage =
  document.getElementById("mainImage");

const mainVideo =
  document.getElementById("mainVideo");

const mentorVideo =
  document.getElementById("mentorVideo");

const mentorPlaceholder =
  document.getElementById("mentorPlaceholder");

const welcomeContent =
  document.getElementById("welcomeContent");

const brandBadge =
  document.getElementById("brandBadge");

const brandInput =
  document.getElementById("brandInput");

const mentorCard =
  document.getElementById("mentorCard");

const studentsList =
  document.getElementById("studentsList");

const studentCount =
  document.getElementById("studentCount");

const statusText =
  document.getElementById("statusText");

const statusDot =
  document.getElementById("statusDot");

const recordTopBtn =
  document.getElementById("recordTopBtn");

const settingsModal =
  document.getElementById("settingsModal");

const toast =
  document.getElementById("toast");


/* =========================================================
   STUDENT DATA
   ========================================================= */

let students = [
  "Student 01",
  "Student 02",
  "Student 03",
  "Student 04",
  "Student 05",
  "Student 06",
  "Student 07",
  "Student 08"
];


/* =========================================================
   RECORDING VARIABLES
   ========================================================= */

let isRecording = false;

let mediaRecorder = null;

let recordedChunks = [];

let recordingStream = null;


/* =========================================================
   RENDER STUDENTS
   ========================================================= */

function renderStudents() {

  if (!studentsList) return;

  studentsList.innerHTML = "";

  students.forEach((name, index) => {

    const student =
      document.createElement("div");

    student.className = "student";

    const initials =
      name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

    student.innerHTML = `

      <div class="avatar">
        ${escapeHTML(initials)}
      </div>

      <div class="student-info">

        <div class="student-name">
          ${escapeHTML(name)}
        </div>

        <div class="student-status">

          <span class="online-dot"></span>

          Online

        </div>

      </div>

      <button
        class="student-menu"
        type="button"
        title="Remove student"
        data-index="${index}"
      >
        ×
      </button>

    `;

    const removeButton =
      student.querySelector(
        ".student-menu"
      );

    removeButton.addEventListener(
      "click",
      function () {

        removeStudent(index);

      }
    );

    studentsList.appendChild(student);

  });


  updateStudentCount();

}


/* =========================================================
   UPDATE STUDENT COUNT
   ========================================================= */

function updateStudentCount() {

  if (!studentCount) return;

  studentCount.textContent =
    students.length +
    (
      students.length === 1
        ? " Student"
        : " Students"
    );

}


/* =========================================================
   ADD STUDENT
   ========================================================= */

function addStudent() {

  const nextNumber =
    students.length + 1;

  const defaultName =
    "Student " +
    String(nextNumber).padStart(2, "0");

  const name =
    prompt(
      "Student name লিখুন:",
      defaultName
    );

  if (name === null) {
    return;
  }

  const cleanName =
    name.trim();

  if (!cleanName) {

    showToast(
      "Student name লিখুন"
    );

    return;

  }

  students.push(cleanName);

  renderStudents();

  showToast(
    "Student added"
  );

}


/* =========================================================
   REMOVE STUDENT
   ========================================================= */

function removeStudent(index) {

  if (
    index < 0 ||
    index >= students.length
  ) {
    return;
  }

  if (students.length === 1) {

    showToast(
      "কমপক্ষে একজন Student রাখুন"
    );

    return;

  }

  const removedName =
    students[index];

  students.splice(index, 1);

  renderStudents();

  showToast(
    removedName +
    " removed"
  );

}


/* =========================================================
   IMAGE UPLOAD
   ========================================================= */

if (imageUpload) {

  imageUpload.addEventListener(
    "change",
    function () {

      const file =
        this.files &&
        this.files[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith("image/")
      ) {

        showToast(
          "শুধু Image file দিন"
        );

        this.value = "";

        return;

      }

      const url =
        URL.createObjectURL(file);

      mainImage.src = url;

      mainImage.style.display =
        "block";

      mainVideo.style.display =
        "none";

      welcomeContent.style.display =
        "none";

      setStatus(
        "Slide ready"
      );

      showToast(
        "Slide / Image loaded"
      );

    }
  );

}


/* =========================================================
   MAIN VIDEO UPLOAD
   ========================================================= */

if (videoUpload) {

  videoUpload.addEventListener(
    "change",
    function () {

      const file =
        this.files &&
        this.files[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith("video/")
      ) {

        showToast(
          "শুধু Video file দিন"
        );

        this.value = "";

        return;

      }

      const url =
        URL.createObjectURL(file);

      mainVideo.src = url;

      mainVideo.style.display =
        "block";

      mainImage.style.display =
        "none";

      welcomeContent.style.display =
        "none";

      mainVideo.load();

      setStatus(
        "Video ready"
      );

      showToast(
        "Main video loaded"
      );

    }
  );

}


/* =========================================================
   MENTOR VIDEO UPLOAD
   ========================================================= */

if (mentorUpload) {

  mentorUpload.addEventListener(
    "change",
    function () {

      const file =
        this.files &&
        this.files[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith("video/")
      ) {

        showToast(
          "শুধু Video file দিন"
        );

        this.value = "";

        return;

      }

      const url =
        URL.createObjectURL(file);

      mentorVideo.src = url;

      mentorVideo.style.display =
        "block";

      mentorPlaceholder.style.display =
        "none";

      mentorVideo.muted = true;

      mentorVideo.loop = true;

      mentorVideo.playsInline = true;

      mentorVideo.play()
        .catch(() => {});

      showToast(
        "Mentor video loaded"
      );

    }
  );

}


/* =========================================================
   MAIN VIDEO PLAY / PAUSE
   ========================================================= */

function toggleMainPlay() {

  const hasVideo =
    mainVideo &&
    mainVideo.style.display ===
      "block" &&
    mainVideo.src;

  if (!hasVideo) {

    showToast(
      "প্রথমে Main Video upload করুন"
    );

    return;

  }

  if (mainVideo.paused) {

    mainVideo
      .play()
      .catch(() => {

        showToast(
          "Video play করা যাচ্ছে না"
        );

      });

    setStatus(
      "Playing"
    );

  } else {

    mainVideo.pause();

    setStatus(
      "Paused"
    );

  }

}


/* =========================================================
   MAIN VIDEO EVENTS
   ========================================================= */

if (mainVideo) {

  mainVideo.addEventListener(
    "play",
    function () {

      setStatus(
        "Playing"
      );

    }
  );


  mainVideo.addEventListener(
    "pause",
    function () {

      if (!isRecording) {

        setStatus(
          "Paused"
        );

      }

    }
  );


  mainVideo.addEventListener(
    "ended",
    function () {

      if (!isRecording) {

        setStatus(
          "Video ended"
        );

      }

    }
  );

}


/* =========================================================
   CLEAR MAIN CONTENT
   ========================================================= */

function clearMainContent() {

  if (mainImage) {

    mainImage.removeAttribute(
      "src"
    );

    mainImage.style.display =
      "none";

  }


  if (mainVideo) {

    mainVideo.pause();

    mainVideo.removeAttribute(
      "src"
    );

    mainVideo.load();

    mainVideo.style.display =
      "none";

  }


  if (welcomeContent) {

    welcomeContent.style.display =
      "block";

  }


  if (imageUpload) {

    imageUpload.value = "";

  }


  if (videoUpload) {

    videoUpload.value = "";

  }


  setStatus(
    "Ready"
  );

  showToast(
    "Main content cleared"
  );

}


/* =========================================================
   FULLSCREEN
   ========================================================= */

function fullscreenStage() {

  const stage =
    document.getElementById(
      "stage"
    );

  if (!stage) {
    return;
  }

  if (!document.fullscreenElement) {

    const request =
      stage.requestFullscreen ||
      stage.webkitRequestFullscreen ||
      stage.msRequestFullscreen;

    if (request) {

      request.call(stage)
        .catch(() => {

          showToast(
            "Fullscreen unavailable"
          );

        });

    } else {

      showToast(
        "Browser fullscreen support নেই"
      );

    }

  } else {

    const exit =
      document.exitFullscreen ||
      document.webkitExitFullscreen;

    if (exit) {

      exit.call(document);

    }

  }

}


/* =========================================================
   RECORDING
   ========================================================= */

async function toggleRecording() {

  if (isRecording) {

    stopRecording();

    return;

  }

  await startRecording();

}


/* =========================================================
   START RECORDING
   ========================================================= */

async function startRecording() {

  if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getDisplayMedia
  ) {

    showToast(
      "এই browser-এ screen recording support নেই"
    );

    return;

  }


  try {

    recordingStream =
      await navigator.mediaDevices
        .getDisplayMedia({

          video: {
            frameRate: 30
          },

          audio: true

        });


    recordedChunks = [];


    const options = {
      videoBitsPerSecond: 6000000
    };


    if (
      MediaRecorder.isTypeSupported(
        "video/webm;codecs=vp9,opus"
      )
    ) {

      options.mimeType =
        "video/webm;codecs=vp9,opus";

    } else if (
      MediaRecorder.isTypeSupported(
        "video/webm;codecs=vp8,opus"
      )
    ) {

      options.mimeType =
        "video/webm;codecs=vp8,opus";

    }


    mediaRecorder =
      new MediaRecorder(
        recordingStream,
        options
      );


    mediaRecorder.addEventListener(
      "dataavailable",
      function (event) {

        if (
          event.data &&
          event.data.size > 0
        ) {

          recordedChunks.push(
            event.data
          );

        }

      }
    );


    mediaRecorder.addEventListener(
      "stop",
      finishRecording
    );


    mediaRecorder.start(
      1000
    );


    isRecording = true;


    updateRecordingUI(
      true
    );


    setStatus(
      "Recording..."
    );


    showToast(
      "Recording started"
    );


    const videoTrack =
      recordingStream.getVideoTracks()[0];


    if (videoTrack) {

      videoTrack.addEventListener(
        "ended",
        function () {

          if (isRecording) {

            stopRecording();

          }

        }
      );

    }


  } catch (error) {

    console.error(
      "Recording error:",
      error
    );


    if (
      recordingStream
    ) {

      recordingStream
        .getTracks()
        .forEach(
          track =>
            track.stop()
        );

    }


    showToast(
      "Screen recording permission দেওয়া হয়নি"
    );

    setStatus(
      "Ready"
    );

  }

}


/* =========================================================
   STOP RECORDING
   ========================================================= */

function stopRecording() {

  if (!mediaRecorder) {

    return;

  }


  if (
    mediaRecorder.state !==
    "inactive"
  ) {

    mediaRecorder.stop();

  }


  if (recordingStream) {

    recordingStream
      .getTracks()
      .forEach(
        track =>
          track.stop()
      );

  }


  isRecording = false;

  updateRecordingUI(
    false
  );

  setStatus(
    "Processing recording..."
  );

}


/* =========================================================
   FINISH RECORDING
   ========================================================= */

function finishRecording() {

  if (
    !recordedChunks.length
  ) {

    setStatus(
      "No recording data"
    );

    return;

  }


  const blob =
    new Blob(
      recordedChunks,
      {
        type: "video/webm"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const downloadLink =
    document.createElement(
      "a"
    );


  downloadLink.href =
    url;


  downloadLink.download =
    "course-recording-" +
    createFileDate() +
    ".webm";


  document.body.appendChild(
    downloadLink
  );


  downloadLink.click();


  downloadLink.remove();


  setTimeout(
    function () {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );


  setStatus(
    "Recording saved"
  );


  showToast(
    "Recording তৈরি হয়েছে"
  );


  recordedChunks = [];

  mediaRecorder = null;

  recordingStream = null;

}


/* =========================================================
   RECORDING UI
   ========================================================= */

function updateRecordingUI(
  recording
) {

  if (!recordTopBtn) {
    return;
  }


  if (recording) {

    recordTopBtn.textContent =
      "■ Stop Recording";

    recordTopBtn.classList.add(
      "active"
    );


    if (statusDot) {

      statusDot.classList.add(
        "recording"
      );

    }

  } else {

    recordTopBtn.textContent =
      "● Record";

    recordTopBtn.classList.remove(
      "active"
    );


    if (statusDot) {

      statusDot.classList.remove(
        "recording"
      );

    }

  }

}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

  if (!settingsModal) {
    return;
  }

  settingsModal.classList.add(
    "show"
  );

}


function closeSettings() {

  if (!settingsModal) {
    return;
  }

  settingsModal.classList.remove(
    "show"
  );

}


function openBrandSettings() {

  openSettings();


  setTimeout(
    function () {

      if (brandInput) {

        brandInput.focus();

        brandInput.select();

      }

    },
    100
  );

}


/* =========================================================
   SAVE SETTINGS
   ========================================================= */

function saveSettings() {

  if (!brandInput) {
    return;
  }


  const name =
    brandInput.value.trim();


  if (!name) {

    showToast(
      "Brand name লিখুন"
    );

    return;

  }


  brandBadge.textContent =
    name;


  localStorage.setItem(
    "courseStudioBrand",
    name
  );


  closeSettings();


  showToast(
    "Settings saved"
  );

}


/* =========================================================
   LOAD SETTINGS
   ========================================================= */

function loadSettings() {

  const savedBrand =
    localStorage.getItem(
      "courseStudioBrand"
    );


  if (
    savedBrand &&
    brandInput &&
    brandBadge
  ) {

    brandInput.value =
      savedBrand;

    brandBadge.textContent =
      savedBrand;

  }


  const savedBackground =
    localStorage.getItem(
      "courseStudioMentorBg"
    );


  if (
    savedBackground &&
    mentorCard
  ) {

    mentorCard.style.background =
      savedBackground;

  }

}


/* =========================================================
   MENTOR BACKGROUND
   ========================================================= */

function changeMentorBackground(
  color
) {

  if (!mentorCard) {
    return;
  }


  mentorCard.style.background =
    color;


  localStorage.setItem(
    "courseStudioMentorBg",
    color
  );


  showToast(
    "Mentor background changed"
  );

}


/* =========================================================
   STATUS
   ========================================================= */

function setStatus(
  text
) {

  if (!statusText) {
    return;
  }

  statusText.textContent =
    text;

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;


function showToast(
  message
) {

  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      function () {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );

}


/* =========================================================
   CREATE FILE DATE
   ========================================================= */

function createFileDate() {

  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      now.getDate()
    ).padStart(2, "0");


  const hour =
    String(
      now.getHours()
    ).padStart(2, "0");


  const minute =
    String(
      now.getMinutes()
    ).padStart(2, "0");


  const second =
    String(
      now.getSeconds()
    ).padStart(2, "0");


  return (
    year +
    month +
    day +
    "-" +
    hour +
    minute +
    second
  );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
  text
) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text;


  return div.innerHTML;

}


/* =========================================================
   SETTINGS MODAL — OUTSIDE CLICK
   ========================================================= */

if (settingsModal) {

  settingsModal.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        settingsModal
      ) {

        closeSettings();

      }

    }
  );

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    /* ESC = Close settings */

    if (
      event.key === "Escape"
    ) {

      closeSettings();

    }


    /* CTRL + ENTER = Recording */

    if (
      event.ctrlKey &&
      event.key === "Enter"
    ) {

      event.preventDefault();

      toggleRecording();

    }

  }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

renderStudents();

loadSettings();

setStatus(
  "Ready"
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
  "load",
  function () {

    console.log(
      "Personal Course Studio ready."
    );

  }
);
