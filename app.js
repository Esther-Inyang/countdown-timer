const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//selecting elements
const giveaway = document.querySelector(".giveaway")
const deadline = document.querySelector(".deadline")
const items = document.querySelectorAll(".deadline-format h4")


//Selecting Date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

                      //year,month,day,hour,min,sec
//let fixedDate = new Date(2022, 1, 25, 11, 30, 0);
const fixedDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0 )

const year = fixedDate.getFullYear();
const hour = fixedDate.getHours();
const minutes = fixedDate.getMinutes();

let month = fixedDate.getMonth();
month = months[month] //from the array of months

const date = fixedDate.getDate();
let weekday = weekdays[fixedDate.getDay()];


//Document Logic
giveaway.textContent = `Giveaway ends on ${weekday} ${date} ${month} ${year} ${hour}:${minutes}am `

//future time in ms
const fixedTime = fixedDate.getTime();


//current time
function getRemainingTime(){
  const todaysTime = new Date().getTime();

  //difference between fixedTime and todaysTime
  const totalTime = fixedTime - todaysTime;

  /*--Take Note--
      1s = 1000ms
      1m = 60s
      1hr = 60mins
      1Day = 24hrs
  */

  //total miliseconds in 1Day
  const msInOneDay = 24 * 60 * 60 * 1000;  //86400000

  //total miliseconds in 1hour
  const msInOneHour = 60 * 60 * 1000; //3600000

  //total miliseconds in 1min
  const msInOneMin = 60 * 1000; //60000

  //calculate all values
  //get total Days
  let days = totalTime/msInOneDay;
  days = Math.floor(days);  // 24 days, i.e number of days before deadline   

  // get only the leftover hours for one day
  let hours = Math.floor((totalTime % msInOneDay) / msInOneHour); //21 hours

  let minutes = Math.floor((totalTime % msInOneHour) / msInOneMin);  //26 minutes now, (constantly updating)

  let seconds = Math.floor((totalTime % msInOneMin) / 1000); //44 seconds now, (constantly updating)

  //set values array
  const values = [days,hours,minutes,seconds];

  //if item value is less than 10 add 0 to it, if above 10 return it same way it is
  function format(item){
    if(item < 10){
      return item = `0${item}`
    }
    return item;
  }

  //get all items
  items.forEach(function(item,index){
    item.innerHTML = format(values[index]);
  })

  if(totalTime < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}

//countdown (every 1 second)
let countdown =  setInterval(getRemainingTime,1000);

getRemainingTime();









