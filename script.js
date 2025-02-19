document.addEventListener("DOMContentLoaded", () => {
    const audioControl = document.getElementById("audio-control");
    const dialogues = document.querySelectorAll(".dialogue-group");

    let isAudioActivated = false;

    // Fonction pour activer l'audio (nécessaire sur certains navigateurs)
    audioControl.addEventListener("click", () => {
        let testAudio = new Audio("https://static.wixstatic.com/mp3/b9ad46_b2e30b69ac3e4765a77fe40f723f9006.mp3");
        testAudio.play()
            .then(() => {
                console.log("L'audio est activé !");
                isAudioActivated = true;
                audioControl.style.display = "none"; // Cache le bouton après activation
            })
            .catch(error => console.error("Erreur d'activation audio :", error));
    });

    // Fonction de lecture d'audio
    function playAudio(audioId, element) {
        if (!isAudioActivated) return; // Ne joue pas si l'audio n'a pas été activé

        document.querySelectorAll("audio").forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        document.querySelectorAll(".dialogue-group").forEach(group => group.classList.remove("clicked"));

        let audioElement = document.getElementById(audioId);
        if (audioElement) {
            audioElement.play().catch(error => console.error("Lecture audio bloquée :", error));
            element.classList.add("clicked");
        }
    }

    // Ajout d'événements aux dialogues
    dialogues.forEach(dialogue => {
        dialogue.addEventListener("click", function () {
            let audioId = this.getAttribute("data-audio");
            playAudio(audioId, this);
        });
    });
});
