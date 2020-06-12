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
  const EVENT_TIME = new Date(year, month, date, hours, minutes, seconds);
});
