let currentSong = new Audio();
let songs;

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(/songs/)[1]);
    }
  }
  return songs;
}

let playMusic = (track, pause = false) => {
  currentSong.src = /songs/ + track.trim();
  if (!pause) {
    currentSong.play();
    play.src = "Images/pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = track
    .replaceAll("%20", " ")
    .replaceAll("/", "");
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function main() {
  songs = await getSongs();
  if (songs.length > 0) {
    playMusic(songs[0], true);
  }

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <img src="Images/music.svg" alt="">
                <div class="info">
                  <div>${song.replaceAll("%20", " ").replaceAll("/", "")}</div>
                  <div>Ammar</div>
                </div>
                <div class="playNow">
                  <span>play now</span>
                <img class ="invert" src="Images/play.svg" alt="">
                </div> </li>`;
  }

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", () => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "Images/pause.svg";
    } else {
      currentSong.pause();
      play.src = "Images/play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    if (isNaN(seconds) || seconds < 0) {
      return "00:00";
    }

    let currentTime = currentSong.currentTime;
    let duration = currentSong.duration;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    let minutes2 = Math.floor(duration / 60);
    let seconds2 = Math.floor(duration % 60);
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    minutes2 = String(minutes2).padStart(2, "0");
    seconds2 = String(seconds2).padStart(2, "0");
    document.querySelector(
      ".songTime"
    ).innerHTML = `${minutes}:${seconds} / ${minutes2}:${seconds2}`;
  });

  //seekBar circle update position

  currentSong.addEventListener("timeupdate", () => {
    let currentTime = currentSong.currentTime;
    let duration = currentSong.duration;
    let percent = (currentTime / duration) * 100;
    document.querySelector(".seekBar .circle").style.left = `${percent}%`;
  });

  document.querySelector(".seekBar").addEventListener("click", (e) => {
    let duration = currentSong.duration;
    let percent = (e.offsetX / e.target.clientWidth) * 100;
    currentSong.currentTime = (percent / 100) * duration;
  });

  document.querySelector(".menu").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index > 0) {
      playMusic(songs[index - 1], false);
    }
  });

  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.findIndex(
      (song) => song === currentSong.src.split("/songs/")[1]
    );
    if (index < songs.length - 1) {
      playMusic(songs[index + 1], false);
    }
  });
}
main();
