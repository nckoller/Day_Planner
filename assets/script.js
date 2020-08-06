// ARRAY OF TIMEBLOCKS
var scheduleBlocksBase = [
  {
    hour: "9:00 AM",
    task: "",
  },
  {
    hour: "10:00 AM",
    task: "",
  },
  {
    hour: "11:00 AM",
    task: "",
  },
  {
    hour: "12:00 PM",
    task: "",
  },
  {
    hour: "1:00 PM",
    task: "",
  },
  {
    hour: "2:00 PM",
    task: "",
  },
  {
    hour: "3:00 PM",
    task: "",
  },
  {
    hour: "4:00 PM",
    task: "",
  },
  {
    hour: "5:00 PM",
    task: "",
  },
];

// DRAW PAGE
function drawPage() {
  const scheduleBlocks = fetchLocalStorage();
  const scheduleContainer = $(".container");
  let timeBlock = "";
  let iter = 0;

  scheduleBlocks.forEach((block) => {
    const timeString = block.hour;
    const colorClass = timeEvaluation(timeString);

    const taskString = block.task;
    const timeBlockTemplate = `<form class="row time-block"><div class="col-2 hour">${timeString}</div><textarea id="saveButton${iter}TextArea" class="col-9 ${colorClass}">${taskString}</textarea><button id="saveButton${iter}" class="col-1 saveBtn"><i class="far fa-save fa-lg"></i></button></form>`;
    timeBlock += timeBlockTemplate;
    iter++;
  });

  $("#container").html(timeBlock);
  const saveButtonsObj = $(".saveBtn");
  const saveButtons = Object.values(saveButtonsObj);

  saveButtons.forEach((button) => {
    document.getElementById(button.id).addEventListener("click", saveTasks);
  });
}
function timeEvaluation(timeString) {
  const timeStringParsed = moment(timeString, "hh:mm A").hours();

  let currentTime = moment().hours();

  if (timeStringParsed < currentTime) {
    return "past";
  } else if (timeStringParsed === currentTime) {
    return "present";
  } else if (timeStringParsed > currentTime) {
    return "future";
  }
}

// SAVE DATA TO LOCAL STORAGE
function saveTasks(e) {
  // get the value of <textarea>
  const taskString = $(`#${e.srcElement.id}TextArea`).val();
  //   save to local storage
  const previousTasks = fetchLocalStorage();
  // modify previousTasks
  const buttonValueNumberString = e.srcElement.id.split("")[10];
  const buttonValueNumber = parseInt(buttonValueNumberString);

  previousTasks[buttonValueNumber].task = taskString;

  localStorage.setItem("timeBlocks", JSON.stringify(previousTasks));
}

// DISPLAY LOCAL STORAGE DATA ON SCHEDULE
function fetchLocalStorage() {
  let scheduleBlocks = JSON.parse(localStorage.getItem("timeBlocks"));
  if (!scheduleBlocks) {
    scheduleBlocks = scheduleBlocksBase;
  }
  return scheduleBlocks;
}

// APPLY DATE TO HEADER
function getDate() {
  var currentHeaderDate = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentHeaderDate);
}

getDate();
drawPage();
