import $ from "jquery";
const path = require("path");

import "../scss/index.scss";

const strd =
  "ewogICJicyI6ICJodHRwczovL3pvb20udXMvai84NTE4MzQ5NDIwIiwKICAidGltZSI6IHsKICAgICJkYXRlIjogMzEsCiAgICAibW9udGgiOiAxMCwKICAgICJ5ZWFyIjogMjAyMCwKICAgICJob3VycyI6IDEzLAogICAgIm1pbnV0ZXMiOiAwLAogICAgInNlY29uZHMiOiAwCiAgfSwKICAidGl0bGUiOiAiQk5DQyBDU1IgMjAyMCIsCiAgInN1YnRpdGxlIjogIkFkanVzdGluZyB0byB0aGUgTmV3IE5vcm1hbCB3aXRoIEdvamVrIiwKICAic2VyaWVzIjogewogICAgIm1haW4iOiAiRGVmaW5lIFByb2JsZW0gU29sdXRpb24gVGhyb3VnaCBUZWNobm9sb2d5ICIsCiAgICAic3ViIjogIldpdGggQXJsaW5kYSBKdXdpdGFzYXJpIEdvamVrIChQcm9kdWN0IE1hbmFnZXIgYXQgR29wYXkpIgogIH0KfQ==";
const str = window.atob(strd).toString();
const db = JSON.parse(str);

const populateData = () => {
  const { title, subtitle, series } = db;
  window.document.title = title;
  document.getElementById("title").innerHTML = title + "&nbsp;:&nbsp;";
  document.getElementById("subtitle").innerHTML = subtitle;
  document.getElementById("series").innerHTML = series.main;
  document.getElementById("sub-series").innerHTML = series.sub;
};

const handleOnLoad = () => {
  const objects = document.getElementById("main");
  console.log(objects);
  const img = new Image();
  console.log(window.location + "public/assets/bg.png");
  img.src = window.location.hostname + "public/assets/bg.png"
  img.onload = () => {
    objects.classList.remove("asyncImg");
    objects.classList.add("notAsyncImg");
  };
  const iframe = document.getElementById("iframe");
  iframe.src = "https://www.filemagz.com/";
};

$(document).ready(function () {
  populateData();
  handleOnLoad();
  const { date, month, year, hours, minutes, seconds } = db.time;
  const EVENT_TIME = new Date(year, month - 1, date, hours, minutes, seconds);
  $.get(
    "https://worldtimeapi.org/api/timezone/Asia/Jakarta",
    (data) => {
      const NOW = new Date(data.datetime);
      const { bs } = db;
      const url = bs;
      let ticker = setInterval(function () {
        if (NOW >= EVENT_TIME) {
          stopTicker();
          window.location.href = url.toString();
        } else {
          const d = document.getElementById("countdown-days");
          const h = document.getElementById("countdown-hours");
          const m = document.getElementById("countdown-minutes");
          const s = document.getElementById("countdown-seconds");
          NOW.setSeconds(NOW.getSeconds() + 1);
          const deltaTime = new Date(EVENT_TIME - NOW);

          var days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor(
            (deltaTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          var seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);
          if (seconds < 11 && minutes === 0 && hours === 0 && days === 0) {
            const main = document.getElementById("main");
            main.style.borderRadius = "0";
            main.style.animation = "animation 3s forwards";
          }
          d.innerHTML = days < 0 ? "0" : days;
          h.innerHTML = hours < 0 ? "0" : hours;
          m.innerHTML = minutes < 0 ? "0" : minutes;
          s.innerHTML = seconds < 0 ? "0" : seconds;
        }
      }, 1000);
      const stopTicker = () => {
        clearInterval(ticker);
      };
    }
  );
});
