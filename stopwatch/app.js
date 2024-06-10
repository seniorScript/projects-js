const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");
const miliseconds = document.getElementById("miliseconds");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

class Stopwatch {
  constructor() {
    this.counter = 0;
    this.time = {
      hours: 0,
      minute: 0,
      seconds: 0,
      miliseconds: 0,
    };
  }
}
