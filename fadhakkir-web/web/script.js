//all special code
document.querySelector('.dhikr-repeat-select-box').style.display = 'none';

const splashscreenhide = function() {
  return
}

//beginning intro line 317
const intro = function () {
    if (!get_cookie("first-intro")) {
        document.querySelector(".intro-box").style.transform =
          "translate(0, -100dvh)";
        document.querySelector(".locate-done").style.opacity = "1";
      } else {
        document.querySelector(".intro-location").scrollIntoView();
      }
      
      document.querySelector(".intro-done").addEventListener("click", function () {
        document
          .querySelector(".intro-location")
          .scrollIntoView({ behavior: "smooth" });
      });
      
      document.querySelector(".locate-done").addEventListener("click", function () {
        main_app_function();
      
        set_cookie("first-intro=true;");
      });
}

//cookie updater
const updateCookies = function () {
  set_cookie([`dhikrs=${JSON.stringify(names)};`]);
  set_cookie([`dhikr_total=${JSON.stringify(dhikr_total)};`]);
  set_cookie([`dhikr_done=${JSON.stringify(dhikr_done)};`]);
};

  //notification reminders
  const add_dhikr_reminder = function (i) {
    return
  };

const schdeuleDhikrNoti = function() {
    return
}  

const unScheduleNoti = function(i) {
    return
}

const vibrate = function() {
    return
}