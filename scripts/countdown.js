class CountDownTimer {
  /**
   *
   * @param nextOccurance - Date of next occurance (end date)
   * @param message - The message/greeting to be presented when end date has been reached
   * @param id - ID of the countdown whose inner HTML needs to be updated
   * @param styleConfig - css  style of the element
   */
  constructor(nextOccurance, message, id, styleConfig) {
    this.nextOccurance = new Date(nextOccurance);
    this.message = message;
    this.timer = 0;
    this.timearr = [0, 0, 0, 0];
    this.id = id;
    this.styleConfig = styleConfig;
  }

  calculateTime() {
    //Get the current time
    var currentTime = new Date().getTime();

    //Convert the end date to time
    var nextDateTime = this.nextOccurance.getTime();

    //calculate the time to next event by subtracting the current time from end time
    var timeToNextEvent = nextDateTime - currentTime;
    this.timer = timeToNextEvent;

    //If next event has already occurred then show the message
    if (timeToNextEvent <= 0) {
      this.countDownDone();
    }

    //If the next event is in the future, repeatedly calculate updated time and update the corresponding HTML
    if (timeToNextEvent > 0) {
      var interval = setInterval(() => {
        this.timer -= 1000;

        this.calcUpdates();
        this.updateHTML();
        //If next event has been reached then countdown is done
        if (this.timer < 0) {
          clearInterval(interval);
          this.countDownDone();
        }
      }, 1000);
    }
  }

  /*Referred to https://www.w3schools.com/howto/howto_js_countdown.asp for the calculations*/
  //calculates the remaining time in days, hours, minutes and seconds.
  calcUpdates() {
    var days = Math.floor(this.timer / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (this.timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((this.timer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((this.timer % (1000 * 60)) / 1000);

    var t = [days, hours, minutes, seconds];
    for (var i = 0; i < t.length; i++) {
      this.timearr[i] = t[i];
    }
  }

  //Helper function to update the HTML to show the time updates
  updateHTML() {
    var element = document.getElementById(this.id);
    if (element) {
      element.innerHTML = `${this.timearr[0]}d ${this.timearr[1]}h ${this.timearr[2]}m ${this.timearr[3]}s `;

      element.style = this.styleConfig;
    }
  }

  countDownDone() {
    document.getElementById(this.id).innerHTML = this.message;
  }
}

var styleConfig =
  "box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); width:95%; height:200px; background-color:#f8f9fa; margin: 20px auto; padding:20px 17%; font-weight: 100; font-size:3em;";

var diwaliCountdown = new CountDownTimer(
  "November 4, 2021 0:00:00",
  "Happy Diwali!",
  "diwaliTime",
  styleConfig
);
var navratriCountdown = new CountDownTimer(
  "October 7, 2021 0:00:00",
  "Happy Navratri!",
  "navratriTime",
  styleConfig
);
var uttrayanCountdown = new CountDownTimer(
  "January 14, 2021 0:00:00",
  "Happy Uttrayan!",
  "uttarayanTime",
  styleConfig
);
var holiCountdown = new CountDownTimer(
  "March 28, 2021 0:00:00",
  "Happy Holi!",
  "holiTime",
  styleConfig
);

var cdowns = [
  diwaliCountdown,
  navratriCountdown,
  uttrayanCountdown,
  holiCountdown,
];

window.onload = () => {
  cdowns.map((elem) => {
    elem.calculateTime();
  });
};
