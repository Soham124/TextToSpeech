// Select necessary elements
const textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");
const button = document.querySelector("button");

// SpeechSynthesis instance
const speech = new SpeechSynthesisUtterance();
let voices = [];

// Fetch available voices
const loadVoices = () => {
  voices = window.speechSynthesis.getVoices();

  // Populate dropdown with available voices
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Set default voice
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
};

// Load voices on page load and when voices change
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Update voice when a new one is selected
voiceSelect.addEventListener("change", () => {
  const selectedVoice = voices[voiceSelect.value];
  speech.voice = selectedVoice;
});

// Handle text-to-speech conversion
button.addEventListener("click", () => {
  const text = textarea.value.trim();

  if (text === "") {
    alert("Please enter some text to convert to speech.");
    return;
  }

  speech.text = text;
  window.speechSynthesis.speak(speech);
});
