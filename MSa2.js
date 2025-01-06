const songs = [ 
    {
        "id": 1,
        "name": "INTRO",
        "artist": "Romeo Santos",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos - Intro.mp3"
    },
    {
        "id": 2,
        "name": "CANALLA",
        "artist": "Romeo Santos, El Chaval de la Bachata",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, El Chaval de la Bachata - Canalla.mp3"
    },
    {
        "id": 3,
        "name": "PAYASOS",
        "artist": "Romeo Santos, Frank Reyes",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Frank Reyes - Payasos.mp3"
    },
    {
        "id": 4,
        "name": "LA DEMANDA",
        "artist": "Romeo Santos, Raulin Rodriguez",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Raulin Rodriguez - La Demanda.mp3"
    },
    {
        "id": 5,
        "name": "MILLONARIO",
        "artist": "Romeo Santos, Elvis Martinez",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Elvis Martinez - Millonario.mp3"
    },
    {
        "id": 6,
        "name": "EL BESO QUE NO LE DI",
        "artist": "Romeo Santos, Kiko Rodriguez",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Kiko Rodriguez - El Beso Que No Le Di.mp3"
    },
    {
        "id": 7,
        "name": "ILESO",
        "artist": "Romeo Santos, Teodoro Reyes",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Teodoro Reyes - Ileso.mp3"
    },
    {
        "id": 8,
        "name": "AMOR ENTERRADOS",
        "artist": "Romeo Santos, Joe Veras",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Joe Veras - Amor Enterrado.mp3"
    },
    {
        "id": 9,
        "name": "ME QUEDO",
        "artist": "Romeo Santos, Zacarias Ferreira",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Zacarias Ferreira - Me Quedo.mp3"
    },
    {
        "id": 10,
        "name": "LOS ULTIMOS",
        "artist": "Romeo Santos, Luis Vargas",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Luis Vargas - Los Últimos.mp3"
    },
    {
        "id": 11,
        "name": "Años Luz",
        "artist": "Romeo Santos, Monchy, Alexandra",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Romeo Santos, Monchy, Alexandra - Años Luz.mp3"
    },
    {
        "id": 12,
        "name": "INMORTAL",
        "artist": "Aventura",
        "img": "UtopiaRomeoPic.jpg",
        "music": "Aventura - Inmortal.mp3"
    }
       
  ];
  const searchInput = document.getElementById("search-input");
  const songList = document.getElementById("song-list");
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const randomButton = document.getElementById("random-button");
  const playPauseButton = document.getElementById("play-pause-button");
  const progressBar = document.getElementById("progress-bar");
  const volumeSlider = document.getElementById("volume-slider");
  const muteButton = document.getElementById("mute-button");
  
  let isPlaying = false;
  let currentSongId = null;
  let isMuted = false;
  
  function renderSongs(filteredSongs = songs) {
    songList.innerHTML = "";

    filteredSongs.forEach(song => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");
        songItem.dataset.songId = song.id;
        songItem.innerHTML = `
            <img src="${song.img}" alt="${song.name}">
            <span>${song.name} - ${song.artist}</span>
        `;

        const songImage = songItem.querySelector("img"); // Get the image element
        songImage.addEventListener("click", () => {
            playOrPauseSong(song);
        });

        songList.appendChild(songItem);
    });
}
 
 function playOrPauseSong(song, img) {
    // Get the song image element by ID
    const songImageDisplay = document.getElementById("current-song-image");

    if (isPlaying && currentSongId === song.id) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioSource.src = song.music;
        audioSource.dataset.songId = song.id;
        audioPlayer.load();
        audioPlayer.play();
        isPlaying = true;
        currentSongId = song.id;
    }
      // Update the current song name display
      const songNameDisplay = document.getElementById("current-song-name");
      songNameDisplay.textContent = song.name;
      
      const artistNameDisplay = document.getElementById("current-artist-name");
      artistNameDisplay.textContent = song.artist;// Display the song name
       
      const idNumberDisplay = document.getElementById("current-id");
      idNumberDisplay.textContent = song.id;// Display the artist name
     }
  
  
  
  audioPlayer.addEventListener("ended", function() {
      const currentSongIndex = songs.findIndex(song => song.id === parseInt(audioSource.dataset.songId));
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      playOrPauseSong(songs[nextSongIndex], document.querySelector(`[data-song-id="${songs[nextSongIndex].id}"] .play-button`));
  });
  
  function playNextSong() {
      const currentSongIndex = songs.findIndex(song => song.id === parseInt(audioSource.dataset.songId));
      const nextSongIndex = (currentSongIndex + 1) % songs.length;
      playOrPauseSong(songs[nextSongIndex], document.querySelector(`[data-song-id="${songs[nextSongIndex].id}"] .play-button`));
  }
  
  function playPrevSong() {
      const currentSongIndex = songs.findIndex(song => song.id === parseInt(audioSource.dataset.songId));
      const prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playOrPauseSong(songs[prevSongIndex], document.querySelector(`[data-song-id="${songs[prevSongIndex].id}"] .play-button`));
  }
  
  function playRandomSong() {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playOrPauseSong(songs[randomIndex], document.querySelector(`[data-song-id="${songs[randomIndex].id}"] .play-button`));
  }
  
  prevButton.addEventListener("click", playPrevSong);
  nextButton.addEventListener("click", playNextSong);
  randomButton.addEventListener("click", playRandomSong);
  
  // Handle play/pause button toggle
  playPauseButton.addEventListener("click", () => {
      if (isPlaying) {
          audioPlayer.pause();
          playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
          isPlaying = false;
      } else {
          if (currentSongId === null) {
              // If no song is playing, start the first song
              playOrPauseSong(songs[0], document.querySelector(`[data-song-id="${songs[0].id}"] .play-button`));
          } else {
              audioPlayer.play();
              playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
              isPlaying = true;
          }
      }
  });
  
  // Progress Bar update
  audioPlayer.addEventListener("timeupdate", () => {
      if (audioPlayer.duration) {
          const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
          progressBar.value = progress;
      }
  });
  
  // Seek functionality
  progressBar.addEventListener("click", (event) => {
      const seekTime = (event.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
      audioPlayer.currentTime = seekTime;
  });
  
  // Handle volume control slider
  volumeSlider.addEventListener("input", (event) => {
      audioPlayer.volume = event.target.value;
  });
  
  // Handle mute/unmute button
  muteButton.addEventListener("click", () => {
      if (isMuted) {
          audioPlayer.muted = false;
          volumeSlider.value = audioPlayer.volume;
          muteButton.querySelector("i").classList.replace("fa-volume-mute", "fa-volume-up");
      } else {
          audioPlayer.muted = true;
          muteButton.querySelector("i").classList.replace("fa-volume-up", "fa-volume-mute");
      }
      isMuted = !isMuted;
  });
  
  audioPlayer.addEventListener("play", () => {
      playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
      isPlaying = true;
  });
  
  audioPlayer.addEventListener("pause", () => {
      playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
      isPlaying = false;
  });
  
  renderSongs();
  
  searchInput.addEventListener("input", function() {
      const searchQuery = searchInput.value.toLowerCase();
  
      const filteredSongs = songs.filter(song =>
          song.name.toLowerCase().includes(searchQuery) ||
          song.artist.toLowerCase().includes(searchQuery)
      );
  
      renderSongs(filteredSongs);
  });
  
  ///voice search ///
  const voiceSearchButton = document.getElementById("voice-search-button");
  
  // Check if the SpeechRecognition API is available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  let recognition;
  if (SpeechRecognition) {
     recognition = new SpeechRecognition();
     recognition.lang = "es-ES"; // Set language for recognition (you can change this to other languages)
     recognition.continuous = false; // Only listen for a single command
     recognition.interimResults = false; // No need for interim results
  
     // Function to start the voice recognition when the button is clicked
     voiceSearchButton.addEventListener("click", () => {
         recognition.start();
     });
  
     // Handle the speech recognition result
     recognition.addEventListener("result", (event) => {
         const transcript = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase to match the song names/artists
         searchInput.value = transcript; // Set the search input to the recognized speech
  
         // Filter the songs based on the recognized voice input
         const filteredSongs = songs.filter(song =>
             song.name.toLowerCase().includes(transcript) ||
             song.artist.toLowerCase().includes(transcript)
         );
  
         renderSongs(filteredSongs); // Render the filtered song list
     });
  
     // Handle speech recognition errors
     recognition.addEventListener("error", (event) => {
         console.error("Speech recognition error:", event.error);
     });
  
     // Optionally, handle the end of recognition
     recognition.addEventListener("end", () => {
         console.log("Voice search ended");
     });
  } else {
     console.error("Sorry, Lollita can not recognized your voice");
  }
  
  // Assuming you already have the following in your HTML:
  // <audio id="notification-sound" src="notification.mp3" preload="auto"></audio>
  
  const notificationSound = document.getElementById("notification-sound");
  
  // Voice search event listener for recognition result
  recognition.addEventListener("result", (event) => {
     const transcript = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase to match the song names/artists
     searchInput.value = transcript; // Set the search input to the recognized speech
  
     // Filter the songs based on the recognized voice input
     const filteredSongs = songs.filter(song =>
         song.name.toLowerCase().includes(transcript) ||
         song.artist.toLowerCase().includes(transcript)
     );
  
     renderSongs(filteredSongs); // Render the filtered song list
  
     // Play the sound notification if songs are found
     if (filteredSongs.length > 0) {
         notificationSound.play(); // Play sound if matches are found
     }
  });
  
  // Optional: Handle other events like error and end if you want to give feedback for those situations
  recognition.addEventListener("error", (event) => {
     console.error("Speech recognition error:", event.error);
  });
  
  // Optional: Handle end of recognition event
  recognition.addEventListener("end", () => {
     console.log("Voice search ended");
  });
  
  
  recognition.addEventListener("result", (event) => {
     // Get the transcript from the speech recognition result
     let transcript = event.results[0][0].transcript.toLowerCase();
  
     // Remove the period at the end of the text if it exists
     if (transcript.endsWith(".")) {
         transcript = transcript.slice(0, -1); // Remove the last character (the period)
     }
  
     // Set the search input to the recognized speech (without period)
     searchInput.value = transcript;
  
     // Filter the songs based on the recognized voice input
     const filteredSongs = songs.filter(song =>
         song.name.toLowerCase().includes(transcript) ||
         song.artist.toLowerCase().includes(transcript)
     );
  
     renderSongs(filteredSongs); // Render the filtered song list
  
     // Play the sound notification if songs are found
     if (filteredSongs.length > 0) {
         notificationSound.play(); // Play sound if matches are found
     }
  });
  
  function toggleClassPlayer(){
  
     const body = document.querySelector('body');
     body.classList.toggle('lightPlayer');
     
     }