let currentSong = new Audio();
let songs;
let currFolder;

/* ======================
   SONG HANDLING
   ====================== */
async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  renderSongList(songs);
  attachSongListEvents();
  return songs;
}

function renderSongList(songs) {
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];

  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML += `<li> 
        <img src="Images/music.svg" alt="">
        <div class="info">
          <div>${song.replaceAll("%20", " ").replaceAll("/", "")}</div>
          <div>Ammar</div>
        </div>
        <div class="playNow">
          <span>play now</span>
          <img src="Images/play.svg" alt="">
        </div> 
      </li>`;
  }
}

function attachSongListEvents() {
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", () => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
}

let playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track.trim();
  if (!pause) {
    currentSong.play();
    play.src = "Images/pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = track
    .replaceAll("%20", " ")
    .replaceAll("/", "");
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

/* ======================
   ALBUM HANDLING
   ====================== */
async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let array = Array.from(anchors);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/")) {
      let folder = e.href.split("/").filter(Boolean).pop();
      await renderAlbumCard(folder);
    }
  }

  attachAlbumEvents();
}

async function renderAlbumCard(folder) {
  let cardContainer = document.querySelector(".cardContainer");
  try {
    let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
    let json = await a.json();

    cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
        <div class="play">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24" height="24"
            fill="#000">
            <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 
            13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 
            19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 
            18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 
            5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 
            4.58042C8.6812 4.21165 10.296 5.12907 13.5257 
            6.96393C16.8667 8.86197 18.5371 9.811 18.8906 
            11.154C19.0365 11.7084 19.0365 12.2916 18.8906 
            12.846Z"
            stroke="black" stroke-width="1.5"
            stroke-linejoin="round"/>
          </svg>
        </div>
        <img src="/songs/${folder}/cover.jpeg" alt="" />
        <h2>${json.title}</h2>
        <p>${json.description}</p>
      </div>`;
  } catch (err) {
    console.error("Missing info.json for folder:", folder);
  }
}

function attachAlbumEvents() {
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}

/* ======================
   PLAYER CONTROLS
   ====================== */
function initPlayPause() {
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "Images/pause.svg";
    } else {
      currentSong.pause();
      play.src = "Images/play.svg";
    }
  });
}

function initTimeUpdate() {
  currentSong.addEventListener("timeupdate", () => {
    let currentTime = currentSong.currentTime;
    let duration = currentSong.duration;
    if (isNaN(duration)) return;

    let minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
    let seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
    let minutes2 = String(Math.floor(duration / 60)).padStart(2, "0");
    let seconds2 = String(Math.floor(duration % 60)).padStart(2, "0");

    document.querySelector(
      ".songTime"
    ).innerHTML = `${minutes}:${seconds} / ${minutes2}:${seconds2}`;

    let percent = (currentTime / duration) * 100;
    document.querySelector(".seekBar .circle").style.left = `${percent}%`;
  });
}

function initSeekBar() {
  const seekBar = document.querySelector(".seekBar");
  seekBar.addEventListener("click", (e) => {
    let duration = currentSong.duration;
    if (isNaN(duration)) return;
    let percent = (e.offsetX / e.target.clientWidth) * 100;
    currentSong.currentTime = (percent / 100) * duration;
  });

  seekBar.addEventListener("mousedown", () => {
    const moveHandler = (ev) => {
      let duration = currentSong.duration;
      if (isNaN(duration)) return;
      let rect = seekBar.getBoundingClientRect();
      let offsetX = ev.clientX - rect.left;
      let percent = (offsetX / seekBar.clientWidth) * 100;
      currentSong.currentTime = (percent / 100) * duration;
    };
    seekBar.addEventListener("mousemove", moveHandler);

    document.addEventListener(
      "mouseup",
      () => {
        seekBar.removeEventListener("mousemove", moveHandler);
      },
      { once: true }
    );
  });
}

function initMenuControls() {
  document.querySelector(".menu").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });
}

function initPrevNext() {
  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index > 0) {
      playMusic(songs[index - 1], false);
    }
  });

  next.addEventListener("click", () => {
    let index = songs.findIndex(
      (song) => song === currentSong.src.split(`/${currFolder}/`)[1]
    );
    if (index < songs.length - 1) {
      playMusic(songs[index + 1], false);
    }
  });
}

function initVolumeControls() {
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("input", (e) => {
      currentSong.volume = e.target.value / 100;
      if (e.target.value < 50) {
        document.querySelector(".volume img").src = "Images/lowVolume.svg";
      } else {
        document.querySelector(".volume img").src = "Images/volume.svg";
      }
    });

  document.querySelector(".volume img").addEventListener("click", () => {
    if (currentSong.muted) {
      currentSong.muted = false;
      document.querySelector(".volume img").src = "Images/volume.svg";
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 5;
    } else {
      currentSong.muted = true;
      document.querySelector(".volume img").src = "Images/mute.svg";
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 0;
    }
  });
}

/* ======================
   MAIN
   ====================== */
async function main() {
  await getSongs("songs/ncs");
  if (songs.length > 0) {
    playMusic(songs[0], true);
  }

  await displayAlbums();

  initPlayPause();
  initTimeUpdate();
  initSeekBar();
  initMenuControls();
  initPrevNext();
  initVolumeControls();
}

main();

/* ======================
   END
   ====================== */
