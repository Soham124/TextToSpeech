document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("textarea");
    const button = document.querySelector("button");
    const select = document.getElementById("languageSelect");

    // List of working voices manually selected
    const workingVoices = [
        { name: "UK English Female", lang: "en-GB" },
        { name: "US English Female", lang: "en-US" },
        { name: "UK English Male", lang: "en-GB" },
        { name: "US English Male", lang: "en-US" }
    ];

    // Populate language dropdown with only available voices
    function populateLanguages() {
        const voices = responsiveVoice.getVoices();
        select.innerHTML = ''; // Clear the select dropdown before populating
        
        workingVoices.forEach(voice => {
            // Check if the voice is available in the system
            const option = document.createElement("option");
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            select.appendChild(option);
        });
    }

    // Load voices once ResponsiveVoice API is ready
    if (responsiveVoice.getVoices().length === 0) {
        // Wait until voices are available
        responsiveVoice.addEventListener('voiceschanged', populateLanguages);
    } else {
        populateLanguages();  // Fallback to populate voices immediately if already loaded
    }

    // Convert text to speech using the selected voice
    function convertTextToSpeech() {
        const text = textarea.value;
        if (text === "") {
            alert("Please enter some text to convert.");
            return;
        }

        const selectedVoiceName = select.value;
        const voices = responsiveVoice.getVoices();
        const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);

        if (!selectedVoice) {
            alert("Selected voice is unavailable.");
            return;
        }

        // Use ResponsiveVoice API to speak the text
        responsiveVoice.speak(text, selectedVoice.name);
    }

    // Event listener for the button
    button.addEventListener("click", convertTextToSpeech);
});
