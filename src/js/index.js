import $ from "jquery";
const path = require("path");

import db from "../db/db.json";
import "../scss/index.scss";

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
  img.src = path.resolve(__dirname, "public/assets/bg.png");
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
    (data, status) => {
      const NOW = new Date(data.datetime);
      const { url } = db;
      let ticker = setInterval(function () {
        if (NOW >= EVENT_TIME) {
          stopTicker();
          window.location.href = url;
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
