import $ from "jquery";

import db from "../db/db.json";
import "../scss/index.scss";

const populateData = () => {
  const { title, subtitle, series } = db;
  window.document.title = title;
  document.getElementById("title").innerHTML = title;
  document.getElementById("subtitle").innerHTML = subtitle;
  document.getElementById("series").innerHTML = series.main;
  document.getElementById("sub-series").innerHTML = series.sub;
};

$(document).ready(function () {
  populateData();
  const { date, month, year, hours, minutes, seconds } = db.time;
  const EVENT_TIME = new Date(year, month - 1, date, hours, minutes, seconds);
  $.get("http://worldtimeapi.org/api/timezone/Asia/Jakarta", (data, status) => {
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
        var minutes = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((deltaTime % (1000 * 60)) / 1000);
        if (seconds < 11 && minutes === 0 && hours === 0 && days === 0) {
          const main = document.getElementById("main");
          main.style.borderRadius = "0";
          main.style.animation = "animation 3s forwards";
        }
        d.innerHTML = (days < 0 ? "0" : days) + "d";
        h.innerHTML = (hours < 0 ? "0" : hours) + "h";
        m.innerHTML = (minutes < 0 ? "0" : minutes) + "m";
        s.innerHTML = (seconds < 0 ? "0" : seconds) + "s";
      }
    }, 1000);
    const stopTicker = () => {
      clearInterval(ticker);
    };
  });
});
