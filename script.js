let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

let start = 1
let end = 20
let time = 1000
let repeater = null

function initialize() {
  resetText()
  resetCount()
  if (repeater !== null) {
    clearInterval(repeater)
  }
}

function startButton() {
  initialize()
  repeater = setInterval(() => {
    if (start > end) {
      render("All done!")
      clearInterval(repeater)
    } else {
      render(start)
      start++
    }
  }, time)
}

function resetButton() {
  initialize()
}

function resetText() {
  let newText = document.getElementById("textToSpeech")
  newText.innerHTML = ""
}

function resetCount() {
  start = 1
}

function onStartChange() {
  const startElem = document.getElementById("start1")
  console.log(startElem.value);
  start = startElem.value
}

function onEndChange() {
  const endElem = document.getElementById("end")
  console.log(endElem.value);
  end = endElem.value
}

function onTimeChange() {
  const timeElem = document.getElementById("time")
  console.log(timeElem.value);
  time = timeElem.value
}

function render(text) {
  let newText = document.getElementById("textToSpeech")
  newText.innerHTML = text
  console.log(text)
  speech.text = text;
  window.speechSynthesis.speak(speech);
}

/*function startButtonText() {
  initialize()
  repeater = setInterval(() => {
    if (start > end) {
      render("All done!")
      clearInterval(repeater)
    } else {
      render(start)
      start++
    }
  }, time)
}*/

//console.log(interval(1, 10, time))

