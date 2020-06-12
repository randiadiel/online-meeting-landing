import $ from "jquery";

import db from "../db/db.json";
require("../scss/index.scss");

const populateData = () => {
  const { title, subtitle, series } = db;
  window.document.title = title;
  document.getElementById("title").innerHTML = title;
  document.getElementById("subtitle").innerHTML = subtitle;
  document.getElementById("series").innerHTML = series;
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
        d.innerHTML = days;
        h.innerHTML = hours;
        m.innerHTML = minutes;
        s.innerHTML = seconds;
      }
    }, 1000);
    const stopTicker = () => {
      clearInterval(ticker);
      console.log("hello");
    };
  });
});
