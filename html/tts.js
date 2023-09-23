const speak = sentence => {
	let utterance = new SpeechSynthesisUtterance();

	utterance.text = sentence;
	utterance.voice = window.speechSynthesis.getVoices().filter(voice => voice.lang == "en-US")[0];

	window.speechSynthesis.speak(utterance);
}

const shutUp = () => {
	window.speechSynthesis.cancel();
}
