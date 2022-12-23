import { songs } from './songs.js';
import { formatDuration } from './utils.js';

const state = {
  currentSong: 0,
  totalSongs: 0,
  playing: false,
}

const elements = {
  coverImage: document.getElementById('album-cover'),
  songName: document.getElementById('song-name'),
  artistName: document.getElementById('artist-name'),
  currentSong: document.getElementById('current-song'),
  songCount: document.getElementById('song-count'),
  currentTime: document.getElementById('current-time'),
  songDuration: document.getElementById('song-duration'),
  progressBar: document.getElementById('progress-bar'),
  audioPlayer: document.getElementById('track'),
  backButton: document.getElementById('back-button'),
  fowardButton: document.getElementById('foward-button'),
  playButton: document.getElementById('play-button'),
}

function updateTrack() {
  const {
    currentSong,
    audioPlayer,
    artistName,
    coverImage,
    songName,
    playButton,
  } = elements;


  const song = songs[state.currentSong];

  currentSong.textContent = state.currentSong + 1;
  audioPlayer.src = song.file;
  coverImage.src = song.cover;
  artistName.textContent = song.artist;
  songName.textContent = song.title;

  document.title = `${song.title} - ${song.artist} | Music Player`;
}

window.addEventListener('load', () => {
  const {
    songCount,
  } = elements;
  songCount.textContent = songs.length;

  updateTrack();
})


elements.audioPlayer.addEventListener('loadedmetadata', () => {
  const { songDuration, progressBar, audioPlayer } = elements;

  songDuration.textContent = formatDuration(audioPlayer.duration);
  progressBar.max = audioPlayer.duration;
  progressBar.value = audioPlayer.currentTime;
})

elements.playButton.addEventListener('click', () => {
  const { playButton, audioPlayer } = elements;

  const icon = playButton.querySelector('i');

  if (state.playing) {
    state.playing = false;
    icon.classList.remove('ph-pause-fill');
    icon.classList.add('ph-play-fill');
    audioPlayer.pause();
    return;
  }

  state.playing = true;
  icon.classList.remove('ph-play-fill');
  icon.classList.add('ph-pause-fill');
  audioPlayer.play();
})

function updateProgressbar() {
  const { progressBar, audioPlayer, currentTime } = elements;

  progressBar.value = audioPlayer.currentTime;
  currentTime.textContent = formatDuration(audioPlayer.currentTime);
}

setInterval(updateProgressbar, 500);

elements.progressBar.addEventListener('click', () => {
  const { audioPlayer, progressBar } = elements;

  audioPlayer.currentTime = progressBar.value;
})

function nextSong() {
  state.currentSong++

  if (state.currentSong > songs.length - 1) {
    state.currentSong = 0;
  }

  updateTrack();

  if (state.playing) {
    state.playing = false;
    const clickEvent = new Event('click');
    elements.playButton.dispatchEvent(clickEvent)
    return;
  }
}

elements.fowardButton.addEventListener('click', nextSong)


function previousSong() {
  state.currentSong--

  if (state.currentSong < 0) {
    state.currentSong = songs.length - 1;
  }

  updateTrack();
}
elements.backButton.addEventListener('click', previousSong)