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

  // start the stopwatch
  start() {
    this.counter = Date.now();
  }

  // stop the stopwatch
  stop() {
    let timeElapsed = Date.now() - this.counter;
    updateTime(timeElapsed);
  }

  // update the time based on timeElapsed
  updateTime(timeElapsed) {
    this.time.hours = Math.floor(timeElapsed / 3600000);
    let remainder = timeElapsed % 3600000;

    this.time.minute = Math.floor(remainder / 60000);
    remainder = remainder % 60000;

    this.time.seconds = Math.floor(remainder / 1000);
    remainder = remainder % 1000;

    this.time.miliseconds = remainder;
  }
}
