//values that have to be declared before the program
let hours = 0;
let minutes = 0;

let prayer_time = 0;
let time_now = 0;
let prayer_time_calc = 0;

let data;
let nextdata;
let change = true;

let primary_color;
let primary_text_color;
let secondary_color;
let secondary_text_color;
let secondary_border_color;
let month;

let next_zawaal;
let prayer_times2;

let get_time_to;
let musjid_maghrib_time;
let repeat = "no_reminder";

let repeats;
let all_dhikrs;
let names;
let dhikr_total;
let dhikr_done;
let total_dhikrs;

let change_data;
let scroll_to_month;
let get_current_date_cal;

let qiblaBearing;

const pSBC = (p, c0, c1, l) => {
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    i = parseInt,
    m = Math.round,
    a = typeof c1 == "string";
  if (
    typeof p != "number" ||
    p < -1 ||
    p > 1 ||
    typeof c0 != "string" ||
    (c0[0] != "r" && c0[0] != "#") ||
    (c1 && !a)
  )
    return null;
  if (!this.pSBCr)
    this.pSBCr = (d) => {
      let n = d.length,
        x = {};
      if (n > 9) {
        ([r, g, b, a] = d = d.split(",")), (n = d.length);
        if (n < 3 || n > 4) return null;
        (x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
          (x.g = i(g)),
          (x.b = i(b)),
          (x.a = a ? parseFloat(a) : -1);
      } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6)
          d =
            "#" +
            d[1] +
            d[1] +
            d[2] +
            d[2] +
            d[3] +
            d[3] +
            (n > 4 ? d[4] + d[4] : "");
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5)
          (x.r = (d >> 24) & 255),
            (x.g = (d >> 16) & 255),
            (x.b = (d >> 8) & 255),
            (x.a = m((d & 255) / 0.255) / 1000);
        else
          (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
      }
      return x;
    };
  (h = c0.length > 9),
    (h = a ? (c1.length > 9 ? true : c1 == "c" ? !h : false) : h),
    (f = this.pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != "c"
        ? this.pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) return null;
  if (l)
    (r = m(P * f.r + p * t.r)),
      (g = m(P * f.g + p * t.g)),
      (b = m(P * f.b + p * t.b));
  else
    (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
      (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
      (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
  (a = f.a),
    (t = t.a),
    (f = a >= 0 || t >= 0),
    (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
  if (h)
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m(a * 1000) / 1000 : "") +
      ")"
    );
  else
    return (
      "#" +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
};

//changing theme
const change_theme = function () {
  const color3 = pSBC(-0.156, primary_color, secondary_color);
  document.head.querySelector('meta[name="theme-color"]').content = `${color3}`;

  //recommended dhikr gradient
  document.querySelectorAll(".recommended").forEach((el) => {
    el.style.backgroundImage = `linear-gradient(to top right ,${secondary_color}22 0%, ${secondary_color}cc 200%)`;
  });
};

//loading screen animation

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", async function () {
    splashscreenhide();

    setTimeout(() => {
      splashscreenhide();

      document.querySelector(".loader-box").style.width = "16dvh";
      document.querySelector(".loader-box").style.marginLeft = "1vw";

      setTimeout(() => {
        splashscreenhide();
        document.querySelector(".loader").style.opacity = "0";
        document.querySelector(".loader").style.pointerEvents = "none";

        change_theme();
      }, 850);
    }, 800);
  });
});

//setting cookie
const set_cookie = function (cookie_main) {
  document.cookie = `${cookie_main.toString()} expires=Thu, 01 Jan ${
    new Date().getFullYear() + 1
  } 00:00:00 UTC;`;
};

//add to json ("theme": "#161925")

function get_cookie(cookie_name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookie_name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

//setting secondary color and primary color
if (get_cookie("primary_color") !== null) {
  primary_color = get_cookie("primary_color");
  primary_text_color = get_cookie("primary_color");
} else {
  primary_color = "#161925";
  primary_text_color = "#161925";
}

if (get_cookie("secondary_color") !== null) {
  secondary_text_color = get_cookie("secondary_color");
  secondary_color = get_cookie("secondary_color");
  secondary_border_color = get_cookie("secondary_color");
} else {
  secondary_color = "#ecba82";
  secondary_text_color = "#ecba82";
  secondary_border_color = "#ecba82";
}

//fixing zawaal bug
if (get_cookie("zawaal-adjust") == null) {
  set_cookie("zawaal-adjust=-1;");
}

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
  "December",
];

//asr calculation method
if (get_cookie("asr_calculation") != null) {
  prayTimes.adjust({ asr: get_cookie("asr_calculation") });
} else {
  prayTimes.adjust({ asr: "Standard" });
}

//setting prayer time method
const select_method = function () {
  if (get_cookie("calculation-method") != null) {
    for (let i = 0; i < 6; i++) {
      if (
        document.querySelectorAll(".calculation-name")[i].textContent ===
        get_cookie("calculation-method")
      ) {
        document.querySelectorAll(".calculation-choice")[i].style.color =
          primary_color;
        document.querySelectorAll(".calculation-choice")[
          i
        ].style.backgroundColor = secondary_color;
      }
    }
  } else {
    document.querySelectorAll(".calculation-choice")[0].style.color =
      primary_color;
    document.querySelectorAll(".calculation-choice")[0].style.backgroundColor =
      secondary_color;
  }
};

if (get_cookie("calculation-method") != null) {
  prayTimes.setMethod(get_cookie("calculation-method"));
  select_method();
} else {
  prayTimes.setMethod("MWL");
  select_method();
}

//displaying current chosen asr calculation method
if (get_cookie("asr_calculation") === "Hanafi") {
  document.querySelector(".asr-hanafi-choice").classList.add("secondary");
  document.querySelector(".asr-standard-choice").classList.remove("secondary");

  document.querySelector(".asr-hanafi-choice").classList.add("primary-text");
  document
    .querySelector(".asr-standard-choice")
    .classList.remove("primary-text");
} else {
  document.querySelector(".asr-hanafi-choice").classList.remove("secondary");
  document.querySelector(".asr-standard-choice").classList.add("secondary");

  document.querySelector(".asr-hanafi-choice").classList.remove("primary-text");
  document.querySelector(".asr-standard-choice").classList.add("primary-text");
}

//code for changing theme on startup

//updating theme
const update_theme = function () {
  //primary
  document.querySelectorAll(".primary-text").forEach(function (el) {
    el.style.color = primary_text_color;
  });
  document.querySelectorAll(".primary-blur").forEach(function (el) {
    el.style.backgroundColor = `${primary_color}cc`;
  });
  document.querySelectorAll(".primary").forEach(function (el) {
    el.style.backgroundColor = primary_color;
  });

  //secondary
  document.querySelectorAll(".secondary-text").forEach(function (el) {
    el.style.color = secondary_text_color;
  });
  document.querySelectorAll(".secondary").forEach(function (el) {
    el.style.backgroundColor = secondary_color;
  });
  document.querySelectorAll(".secondary-border").forEach(function (el) {
    el.style.borderColor = secondary_border_color;
  });
  document.querySelectorAll(".secondary-border-blur").forEach(function (el) {
    el.style.borderColor = `${secondary_border_color}22`;
  });
  document.querySelectorAll(".secondary-blur").forEach(function (el) {
    el.style.backgroundColor = `${secondary_color}22`;
  });

  //change three dot animation
  document
    .querySelector(".three-body")
    .style.setProperty("--uib-color", secondary_color);

  //changing secondary and primary color for animation
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondary_color
  );
  document.documentElement.style.setProperty(
    "--secondary-blur-color",
    `${secondary_color}22`
  );
  document.documentElement.style.setProperty("--primary-color", primary_color);
  document.documentElement.style.setProperty(
    "--primary-blur-color",
    `${primary_color}cc`
  );

  //changing gradient in navigation
  document.querySelector(
    ".navigation-box"
  ).style.backgroundImage = `linear-gradient(to top, ${primary_color} 10%, ${primary_color}00 100%)`;
};

update_theme();

//beginning intro
intro();

//getting users latitude and longitude
const getCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      document.querySelector(".city").textContent = "Geolocation not supported";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        document.querySelector(".city").textContent = "No location access";
      }
    );
  });
};

const get_location = async function () {
  let cookie_location;
  if (get_cookie("location")) {
    cookie_location = {
      latitude: JSON.parse(get_cookie("location"))?.[0],
      longitude: JSON.parse(get_cookie("location"))?.[1],
    };
  }

  const { latitude, longitude } =
    cookie_location || (await getCoordinates()).coords;
  set_cookie(`location=${JSON.stringify([latitude, longitude])};`);

  //hiding musjid times if needed
  if (
    !(
      latitude < -27.6 &&
      latitude > -27.85 &&
      longitude > 29.8 &&
      longitude < 30.1
    )
  ) {
    document.querySelector(".pop-up-musjids").style.display = "none";
    document.querySelector(".musjids-loader").style.display = "none";
  }

  return { latitude, longitude };
};

const main_app_function = async () => {
  try {
    // Get location
    const { latitude, longitude } = await get_location();

    // Proceed with the rest of the app
    main_code(latitude, longitude);
  } catch (error) {
    document.querySelector(".locating-box").style.pointerEvents = "auto";
    document.querySelector(".intro-box").style.transform =
      "translate(0, -100dvh)";
    document.querySelector(".intro").style.pointerEvents = "auto";
    document.querySelector(".intro-box").style.opacity = "1";
  }
};

//main code
const main_code = (latitude, longitude) => {
  splashscreenhide();

  //removing location message
  document.querySelector(".locating-box").style.pointerEvents = "none";
  document.querySelector(".intro-box").style.transform = "translate(0, 0)";
  document.querySelector(".intro").style.pointerEvents = "none";
  document.querySelector(".intro-box").style.opacity = "0";

  //tune function for editing prayer times
  const tune = function () {
    prayTimes.tune({
      maghrib: document.cookie.includes("maghrib-adjust")
        ? Number(get_cookie("maghrib-adjust"))
        : 3,
      asr: document.cookie.includes("asr-adjust")
        ? Number(get_cookie("asr-adjust"))
        : 0.5,
      dhuhr: document.cookie.includes("duhr-adjust")
        ? Number(get_cookie("duhr-adjust"))
        : 5.5,
      isha: document.cookie.includes("isha-adjust")
        ? Number(get_cookie("isha-adjust"))
        : 5.5,
      imsak: document.cookie.includes("imsak-adjust")
        ? Number(get_cookie("imsak-adjust"))
        : 4.5,
      fajr: document.cookie.includes("fajr-adjust")
        ? Number(get_cookie("fajr-adjust"))
        : -0.5,
      sunset: document.cookie.includes("sunset-adjust")
        ? Number(get_cookie("sunset-adjust"))
        : 0,
      sunrise: document.cookie.includes("sunrise-adjust")
        ? Number(get_cookie("sunrise-adjust"))
        : -1.5,
      midnight: document.cookie.includes("midnight-adjust")
        ? Number(get_cookie("midnight-adjust"))
        : -0.5,
    });
  };

  //showing city
  function getCity(latitude, longitude, change = false, temp_city = null) {
    if (!get_cookie("city") || change) {
      // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCQsFLtbalIk0dwOCdlnz4y4UL9Fs1IKY8`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Parse the city name from the API response
          const city = data.results[0].address_components.find((component) =>
            component.types.includes("locality")
          ).long_name;

          set_cookie(`city=${city};`);

          //changing city cookie
          if (temp_city !== city) {
            console.log(temp_city, city);
            document.querySelector(".city").textContent = "Please restart app";
          } else {
            document.querySelector(".city").textContent = city;
          }
        })
        .catch((error) => {});
    } else {
      document.querySelector(".city").textContent = get_cookie("city");
    }
  }
  getCity(latitude, longitude);

  //code for changing location when city-box is pressed
  document
    .querySelector(".city-box")
    .addEventListener("click", async function () {
      const temp_city = document.querySelector(".city").textContent;
      document.querySelector(".city").textContent = "loading..";

      const { latitude, longitude } = (await getCoordinates()).coords;
      set_cookie(`location=${JSON.stringify([latitude, longitude])};`);

      //updating city
      getCity(latitude, longitude, true, temp_city);
    });

  //saving old prayer times
  data = prayTimes.getTimes(
    new Date(),
    [latitude, longitude],
    new Date().getTimezoneOffset() / -60
  );

  prayer_times2 = [
    data.fajr,
    data.dhuhr,
    data.asr,
    data.maghrib,
    data.isha,
    data.sunrise,
    data.sunset,
    data.imsak,
    data.midnight,
    data.dhuhr,
  ];

  //setting new prayer times

  tune();

  data = prayTimes.getTimes(
    new Date(),
    [latitude, longitude],
    new Date().getTimezoneOffset() / -60
  );

  nextdata = prayTimes.getTimes(
    new Date(new Date(new Date().setDate(new Date().getDate() + 1))),
    [latitude, longitude],
    new Date().getTimezoneOffset() / -60
  );

  //start of moon phase calculator
  
  const getJulianDate = (date = new Date()) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset();

    return time / 86400000 - tzoffset / 1440 + 2440587.5;
  };

  const LUNAR_MONTH = 29.530588853;
  const getLunarAge = (date = new Date()) => {
    const percent = getLunarAgePercent(date);
    //const age = ;
    return percent * LUNAR_MONTH;
  };
  const getLunarAgePercent = (date = new Date()) => {
    return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
  };
  const normalize = (value) => {
    value = value - Math.floor(value);
    if (value < 0) value = value + 1;
    return value;
  };

  //updating moon phase element to current moon phase
  const getLunarPhase = (date) => {
    const age = getLunarAge(date);
    const color2 = pSBC(-0.1, primary_color, secondary_color);

    if (age < 1.84566) {
      document.querySelector(".moon-phase").style.width = "200%";
      document.querySelector(".moon-box").style.backgroundColor = `${color2}`;
      document.querySelector(".moon-phase").style.backgroundColor = `${color2}`;
      return;
    } else if (age < 5.53699) {
      document.querySelector(".moon-phase").style.width = "100%";
      document.querySelector(".moon-box").style.backgroundColor = `${color2}`;
      document.querySelector(".moon-phase").style.backgroundColor = `${color2}`;
      return;
    } else if (age < 9.22831) {
      document.querySelector(".moon-phase").style.width = "0";
      document.querySelector(".moon-box").style.backgroundColor = `${color2}`;
      document.querySelector(".moon-phase").style.backgroundColor = `${color2}`;
      return;
    } else if (age < 12.91963) {
      document.querySelector(".moon-phase").style.width = "100%";
      document.querySelector(".moon-box").style.transform = "scaleX(1)";
      document.querySelector(".moon-phase").style.backgroundColor =
        secondary_color;
      document.querySelector(".moon-box").style.backgroundColor =
        secondary_color;
      document.querySelector(
        ".moon-box-inside"
      ).style.backgroundColor = `${color2}`;
      return;
    } else if (age < 16.61096) {
      document.querySelector(".moon-phase").style.width = "200%";
      document.querySelector(".moon-box").style.transform = "scaleX(1)";
      document.querySelector(".moon-phase").style.backgroundColor =
        secondary_color;
      document.querySelector(".moon-box").style.backgroundColor =
        secondary_color;
      document.querySelector(
        ".moon-box-inside"
      ).style.backgroundColor = `${color2}`;
      return;
    } else if (age < 20.30228) {
      document.querySelector(".moon-phase").style.width = "100%";
      document.querySelector(".moon-phase").style.backgroundColor =
        secondary_color;
      document.querySelector(".moon-box").style.backgroundColor =
        secondary_color;
      document.querySelector(
        ".moon-box-inside"
      ).style.backgroundColor = `${color2}`;
      return;
    } else if (age < 23.99361) {
      document.querySelector(".moon-phase").style.width = "0%";
      document.querySelector(".moon-box").style.transform = "scaleX(-1)";
      document.querySelector(".moon-phase").style.backgroundColor =
        secondary_color;
      document.querySelector(".moon-box").style.backgroundColor =
        secondary_color;
      document.querySelector(
        ".moon-box-inside"
      ).style.backgroundColor = `${color2}`;
      return;
    } else if (age < 27.68493) {
      document.querySelector(".moon-phase").style.width = "100%";
      document.querySelector(".moon-box").style.transform = "scaleX(1)";
      document.querySelector(".moon-box").style.backgroundColor = `${color2}`;
      document.querySelector(".moon-phase").style.backgroundColor = `${color2}`;
      return;
    }
    document.querySelector(".moon-phase").style.width = "200%";
  };

  //moon phase calculater is slightly off(by 2 days) **not anymore
  getLunarPhase(new Date());

  //end of moon phase calculate

  //important functions
  const resetPrayerTimeStyle = function () {
    document.querySelectorAll(".prayer-box").forEach(function (el) {
      el.classList.add("date-change-prayer-time");
    });
  };

  const opacity1prayerTime = function () {
    document.querySelectorAll(".prayer-box").forEach(function (el) {
      el.classList.remove("date-change-prayer-time");
    });
  };

  const get_zawaal_time = function (date) {
    prayTimes.tune({ dhuhr: 0 });

    next_zawaal = prayTimes.getTimes(
      date,
      [latitude, longitude],
      new Date().getTimezoneOffset() / -60
    ).dhuhr;

    prayer_time_calc =
      Number(next_zawaal.split(":")[0]) * 60 +
      Number(next_zawaal.split(":")[1]);
    time_now = Number(prayer_time_calc + Number(get_cookie("zawaal-adjust")));

    hours = parseInt(time_now / 60);
    minutes = time_now - hours * 60;

    tune();

    return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
  };

  const update_prayer_times = function () {
    prayer_time_fajr_el.textContent = data.fajr;
    prayer_time_duhr_el.textContent = data.dhuhr;
    prayer_time_asr_el.textContent = data.asr;
    prayer_time_maghrib_el.textContent = data.maghrib;
    prayer_time_isha_el.textContent = data.isha;
    prayer_time_imsak_el.textContent = data.imsak;
    prayer_time_midnight_el.textContent = data.midnight;
    prayer_time_sunrise_el.textContent = data.sunrise;
    prayer_time_sunset_el.textContent = data.sunset;
  };

  change_data = function () {
    tune();

    data = prayTimes.getTimes(
      new Date(),
      [latitude, longitude],
      new Date().getTimezoneOffset() / -60
    );

    update_prayer_times();
    prayer_time_zawaal_el.textContent = get_zawaal_time(new Date());

    document.querySelector(".arrow").classList.add("hidden");
    document.querySelector(".today-box").classList.remove("hidden-today");

    opacity1prayerTime();

    document.querySelectorAll(".dates").forEach(function (date) {
      date.style.backgroundColor = "transparent";
      date.style.color = secondary_text_color;
    });

    document.querySelectorAll(".calender-dates").forEach(function (date) {
      date.style.backgroundColor = "transparent";
      date.style.color = primary_text_color;
    });

    //hiding musjid times

    document.querySelector(".pop-up-box").classList.remove("hidden-4");
  };

  ////////////////////////////
  //date picker and calender//
  ////////////////////////////

  document.querySelector(".today").textContent =
    new Date().getDate() + " " + months[new Date().getMonth()];

  function daysInMonth(month2) {
    return new Date(new Date().getFullYear(), month2 + 1, 0).getDate();
  }

  const calender_el = document.querySelector(".pop-up-calender");

  // date picker date changer
  for (let i = 0; i < 7; i++) {
    document.querySelectorAll(".dates")[i].textContent = new Date(
      new Date(new Date().setDate(new Date().getDate() + i + 1))
    ).getDate();
  }

  //date picker changer

  document.querySelectorAll(".dates").forEach(function (button) {
    button.addEventListener("click", function (e) {
      document.querySelectorAll(".calender-dates").forEach(function (date) {
        date.style.backgroundColor = "transparent";
        date.style.color = primary_text_color;
      });

      //hiding musjid times
      document.querySelector(".pop-up-box").classList.add("hidden-4");

      //changing prayer time opacity
      resetPrayerTimeStyle();

      document.querySelectorAll(".dates").forEach(function (date) {
        date.style.backgroundColor = "transparent";
        date.style.color = secondary_text_color;
      });

      button.style.backgroundColor = secondary_color;
      button.style.color = primary_text_color;

      tune();

      data = prayTimes.getTimes(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() +
            (Number(e.target.textContent) < new Date().getDate() ? 1 : 0),
          Number(e.target.textContent)
        ),
        [latitude, longitude],
        new Date().getTimezoneOffset() / -60
      );

      update_prayer_times();
      prayer_time_zawaal_el.textContent = get_zawaal_time(
        new Date(
          new Date(
            new Date().setDate(
              new Date().getDate() +
                Number(e.target.textContent) -
                new Date().getDate()
            )
          )
        )
      );

      document.querySelector(".arrow").classList.remove("hidden");
      document.querySelector(".today-box").classList.add("hidden-today");
    });
  });
  ////////////////////
  //calendar picker//
  ///////////////////

  //only for theme change
  get_current_date_cal = function () {
    document
      .querySelectorAll(".pop-up-calender-dates")
      [month].querySelectorAll(".calender-dates")
      .forEach(function (de) {
        if (Number(de.textContent) === new Date().getDate()) {
          de.style.borderColor = primary_color;
        }
      });
  };
  //

  //calendar month length check
  month = new Date().getMonth();

  scroll_to_month = function () {
    calender_el
      .querySelectorAll(".month")
      [month].scrollIntoView({ behavior: "smooth" });
    document
      .querySelectorAll(".pop-up-calender-dates")
      [month].scrollIntoView();
  };

  //ordering dates

  const order_dates = function () {
    for (let i2 = 0; i2 < 12; i2++) {
      const day = new Date(new Date().getFullYear(), i2, 1).getDay();

      //ordering dates according to days
      if (daysInMonth(i2) === 30) {
        calender_el.querySelectorAll(".date-31")[i2].classList.add("hidden");
      }
      if (daysInMonth(i2) === 29) {
        calender_el.querySelectorAll(".date-30")[i2].classList.add("hidden");
        calender_el.querySelectorAll(".date-31")[i2].classList.add("hidden");
      }
      if (daysInMonth(i2) === 28) {
        calender_el.querySelectorAll(".date-29")[i2].classList.add("hidden");
        calender_el.querySelectorAll(".date-30")[i2].classList.add("hidden");
        calender_el.querySelectorAll(".date-31")[i2].classList.add("hidden");
      }

      for (let i = 0; i < day; i++) {
        document
          .querySelectorAll(".pop-up-calender-dates")
          [i2].querySelectorAll(".calender-dates-e")
          [i].classList.remove("hidden4");
      }
    }
  };

  order_dates();
  scroll_to_month();
  //

  //month changer
  document.querySelectorAll(".month-arrow-box").forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.classList.contains("back") && month !== 0) {
        month = month - 1;
        scroll_to_month();
        change_data();
        document.querySelectorAll(".calender-dates").forEach(function (date) {
          date.style.borderColor = "transparent";
        });
      } else if (el.classList.contains("next") && month !== 11) {
        month = month + 1;
        scroll_to_month();
        change_data();
        document.querySelectorAll(".calender-dates").forEach(function (date) {
          date.style.borderColor = "transparent";
        });
      }

      if (month === new Date().getMonth()) {
        get_current_date_cal();
      }
    });
  });

  //main functions for calendar

  //calendar picker changing date//
  document
    .querySelector(".calender-box")
    .addEventListener("click", function () {
      document
        .querySelector(".pop-up-calender-box")
        .classList.remove("hidden-2");
      /*document.querySelector('.pop-up-calender').style.backgroundColor = secondary_color + '22';*/
    });

  document
    .querySelector(".pop-up-calender-box")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("pop-up-calender-box")) {
        document
          .querySelector(".pop-up-calender-box")
          .classList.add("hidden-2");
        /*document.querySelector('.pop-up-calender').style.backgroundColor = secondary_color;*/
        if (
          document
            .querySelector(".today-box")
            .classList.contains("hidden-today") === false
        ) {
          month = new Date().getMonth();
          scroll_to_month();
          get_current_date_cal();
        }
      }
    });

  document.querySelectorAll(".calender-dates").forEach(function (date) {
    if (Number(date.textContent) === new Date().getDate()) {
      date.style.borderColor = primary_color;
    }

    date.addEventListener("click", function (e) {
      document.querySelector(".pop-up-calender-box").classList.add("hidden-2");

      //hiding pop up details
      document.querySelector(".pop-up-box").classList.add("hidden-4");

      //changing prayer time opacity
      resetPrayerTimeStyle();

      if (
        Number(date.textContent) === new Date().getDate() &&
        month === new Date().getMonth()
      ) {
        change_data();
        month = new Date().getMonth();
        scroll_to_month();
        get_current_date_cal();
      } else {
        document.querySelectorAll(".dates").forEach(function (date2) {
          date2.style.backgroundColor = "transparent";
          date2.style.color = secondary_text_color;
        });

        document.querySelectorAll(".calender-dates").forEach(function (date) {
          date.style.backgroundColor = "transparent";
          date.style.color = primary_text_color;
        });
        e.target.style.backgroundColor = primary_color;
        e.target.style.color = secondary_color;

        tune();
        data = prayTimes.getTimes(
          //new Date(new Date(new Date(new Date(). setDate(new Date().getDate() + Number(e.target.textContent) - new Date().getDate())))),
          new Date(
            new Date().getFullYear(),
            month,
            Number(e.target.textContent)
          ),
          [latitude, longitude],
          new Date().getTimezoneOffset() / -60
        );
        update_prayer_times();
        prayer_time_zawaal_el.textContent = get_zawaal_time(
          new Date(
            new Date().getFullYear(),
            month,
            Number(e.target.textContent)
          )
        );

        document.querySelector(".arrow").classList.remove("hidden");
        document.querySelector(".today-box").classList.add("hidden-today");
      }
    });
  });

  //switching day back to today
  document.querySelector(".today-box").addEventListener("click", function () {
    change_data();
    month = new Date().getMonth();
    scroll_to_month();
    get_current_date_cal();
  });

  ////////////////////////////
  //displaying prayer times//
  ///////////////////////////

  //all prayer time elemnts

  const prayer_time_fajr_el = document.querySelector(".fajr-box .prayer-time");
  const prayer_time_midnight_el = document.querySelector(
    ".midnight-box .prayer-time"
  );
  const prayer_time_sunset_el = document.querySelector(
    ".sunset-box .prayer-time"
  );
  const prayer_time_duhr_el = document.querySelector(".duhr-box .prayer-time");
  const prayer_time_zawaal_el = document.querySelector(
    ".zawaal-box .prayer-time"
  );
  const prayer_time_sunrise_el = document.querySelector(
    ".sunrise-box .prayer-time"
  );
  const prayer_time_imsak_el = document.querySelector(
    ".imsak-box .prayer-time"
  );
  const prayer_time_asr_el = document.querySelector(".asr-box .prayer-time");
  const prayer_time_maghrib_el = document.querySelector(
    ".maghrib-box .prayer-time"
  );
  const prayer_time_isha_el = document.querySelector(".isha-box .prayer-time");

  //changing element text content to prayer times
  const fajr_time = data.fajr.split(":");
  const duhr_time = data.dhuhr.split(":");
  const zawaal_time = get_zawaal_time(new Date()).split(":");
  const asr_time = data.asr.split(":");
  const maghrib_time = data.maghrib.split(":");
  const isha_time = data.isha.split(":");
  const imsak_time = data.imsak.split(":");
  const sunrise_time = data.sunrise.split(":");
  const sunset_time = data.sunset.split(":");
  const midnight_time = data.midnight.split(":");

  const fajr_time_to = nextdata.fajr.split(":");
  const duhr_time_to = nextdata.dhuhr.split(":");
  const zawaal_time_to = get_zawaal_time(
    new Date(new Date(new Date().setDate(new Date().getDate() + 1)))
  ).split(":");
  const asr_time_to = nextdata.asr.split(":");
  const maghrib_time_to = nextdata.maghrib.split(":");
  const isha_time_to = nextdata.isha.split(":");
  const imsak_time_to = nextdata.imsak.split(":");
  const sunrise_time_to = nextdata.sunrise.split(":");
  const sunset_time_to = nextdata.sunset.split(":");
  const midnight_time_to = nextdata.midnight.split(":");

  update_prayer_times();
  prayer_time_zawaal_el.textContent = get_zawaal_time(new Date());

  //////////////////////////////
  //displaying prayer times to//
  //////////////////////////////

  //all prayer time to elements
  const prayer_time_to_fajr_el = document.querySelector(
    ".fajr-box .prayer-time-to"
  );
  const prayer_time_to_duhr_el = document.querySelector(
    ".duhr-box .prayer-time-to"
  );
  const prayer_time_to_zawaal_el = document.querySelector(
    ".zawaal-box .prayer-time-to"
  );
  const prayer_time_to_asr_el = document.querySelector(
    ".asr-box .prayer-time-to"
  );
  const prayer_time_to_maghrib_el = document.querySelector(
    ".maghrib-box .prayer-time-to"
  );
  const prayer_time_to_isha_el = document.querySelector(
    ".isha-box .prayer-time-to"
  );

  const prayer_time_to_imsak_el = document.querySelector(
    ".imsak-box .prayer-time-to"
  );

  const prayer_time_to_sunset_el = document.querySelector(
    ".sunset-box .prayer-time-to"
  );

  const prayer_time_to_sunrise_el = document.querySelector(
    ".sunrise-box .prayer-time-to"
  );

  const prayer_time_to_midnight_el = document.querySelector(
    ".midnight-box .prayer-time-to"
  );

  //some extra arrays and functions

  const prayer_times = [
    data.fajr,
    data.sunrise,
    get_zawaal_time(new Date()),
    data.dhuhr,
    data.asr,
    data.sunset,
    data.maghrib,
    data.isha,
  ];

  const prayer_times_adj = [
    data.fajr,
    data.dhuhr,
    data.asr,
    data.maghrib,
    data.isha,
    data.sunrise,
    data.sunset,
    data.imsak,
    data.midnight,
    get_zawaal_time(new Date()),
  ];

  const prayer_names = [
    "Imsak",
    "Sunrise",
    "Zawaal",
    "Duhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
  ];
  const prayer_names2 = [
    "Fajr",
    "None",
    "Zawaal",
    "Duhr",
    "Asr",
    "None",
    "Maghrib",
    "Isha",
  ];

  //highlighting current prayer time
  const get_next_prayer_index = function () {
    for (let i = 0; i < 8; i++) {
      if (
        `${
          new Date().getHours() > 9
            ? new Date().getHours()
            : "0" + new Date().getHours()
        }:${new Date().getMinutes()}` < prayer_times[i]
      ) {
        return i;
      }
    }
    return 0;
  };

  /*
  const change_next_prayer = function () {
    const index = (prayer_names[get_next_prayer_index()]).toLowerCase();
  
    if (document.querySelector(".today-box").classList.contains('hidden-today') === false) {
      document.querySelector(`.${index}-box .prayer-time-to`).style.backgroundColor = `${secondary_color}`;
      //prayer_time_to_el.style.outline = `${secondary_color}99 solid 0.4vw`
      document.querySelector(`.${index}-box .prayer-time-to`).style.color = `${primary_color}`;
  
      document.querySelector(`.${index}-box .prayer-time`).style.color = `${secondary_color}`;
      document.querySelector(`.${index}-box .prayer-time-box`).style.borderColor = `${secondary_color}`;
      document.querySelector(`.${index}-box .prayer-name`).style.color = `${secondary_color}`;
    }
  }
   */

  const scroll_to_next_prayer = function () {
    document
      .querySelector(
        `.${prayer_names[get_next_prayer_index()].toLowerCase()}-box`
      )
      .parentElement.scrollIntoView();
    //change_next_prayer()
  };

  //getting time until the next prayer ends

  const get_time_to_next = function () {
    let now = new Date();
    const int = get_next_prayer_index();

    prayer_time = prayer_times[int].split(":");

    prayer_time_calc = Number(prayer_time[0]) * 60 + Number(prayer_time[1]);
    time_now = now.getHours() * 60 + now.getMinutes();

    if (int !== 0) {
      prayer_time_calc = prayer_time_calc - time_now;
      hours = parseInt(prayer_time_calc / 60);
      minutes = prayer_time_calc - hours * 60;
      if (prayer_names2[int - 1] === "None") {
        document.querySelector(".next-prayer-name").textContent =
          prayer_names2[int - 1];
        document.querySelector(".next-prayer-time-to").textContent =
          hours +
          (hours === 1 ? " hr " : " hrs ") +
          minutes +
          `${minutes === 1 ? " min" : " mins"} until ${
            int === 2 ? "Zawaal" : "Maghrib"
          }`;
      } else {
        document.querySelector(".next-prayer-name").textContent =
          prayer_names2[int - 1];
        document.querySelector(".next-prayer-time-to").textContent =
          hours +
          (hours === 1 ? " hr " : " hrs ") +
          minutes +
          `${minutes === 1 ? " min" : " mins"} left`;
      }
    } else {
      //does equal to 0
      prayer_time = fajr_time_to;

      prayer_time_calc =
        (Number(prayer_time[0]) + (now.getHours() > prayer_time[0] ? 24 : 0)) *
          60 +
        Number(prayer_time[1]);

      prayer_time_calc = prayer_time_calc - time_now;
      hours = parseInt(prayer_time_calc / 60);
      minutes = prayer_time_calc - hours * 60;

      document.querySelector(".next-prayer-name").textContent =
        prayer_names2[7];
      document.querySelector(".next-prayer-time-to").textContent =
        hours +
        (hours === 1 ? " hr " : " hrs ") +
        minutes +
        `${minutes === 1 ? " min" : " mins"} left`;
    }
  };

  //getting time until all prayer times
  get_time_to = function (prayer_time, prayer_time_to, prayer_time_to_el) {
    const currentBox = prayer_time_to_el.parentElement.parentElement;
    currentBox.classList.remove("non-active-prayer-time");

    //update time
    let now = new Date();

    prayer_time_calc =
      (Number(prayer_time[0]) === 0
        ? Number(prayer_time[0]) + 24
        : Number(prayer_time[0])) *
        60 +
      Number(prayer_time[1]);
    time_now = now.getHours() * 60 + now.getMinutes();

    if (prayer_time[0] === 0) {
      prayer_time_calc =
        (Number(prayer_time_to[0]) + 24) * 60 + Number(prayer_time_to[1]);
    } else if (prayer_time_calc < time_now) {
      prayer_time_calc =
        (Number(prayer_time_to[0]) + 24) * 60 + Number(prayer_time_to[1]);

      if (
        document
          .querySelector(".today-box")
          .classList.contains("hidden-today") === false
      ) {
        currentBox.classList.add("non-active-prayer-time");
      }
    }

    prayer_time_calc = prayer_time_calc - time_now;
    hours = parseInt(prayer_time_calc / 60);
    minutes = prayer_time_calc - hours * 60;

    prayer_time_to_el.parentElement.querySelector(
      ".prayer-time-to-hour"
    ).textContent = "-" + hours;
    prayer_time_to_el.parentElement.querySelector(
      ".prayer-time-to-minutes"
    ).textContent = minutes > 9 ? minutes : "0" + minutes;
  };

  // Call the function to get pending notification IDs

  //sending notification **not working unless website is always open
  /*const send_notification = function (prayer_time, prayer_name) {
    if (change === true) {
      prayer_time_calc = Number(prayer_time[0]) * 60 + Number(prayer_time[1]);
      time_now = now.getHours() * 60 + now.getMinutes();
  
      if (prayer_time_calc === time_now) {
        hours = parseInt(prayer_time_calc / 60);
        minutes = prayer_time_calc - hours * 60;
  
        new Notification("It's time to pray now!", {
          body: `${prayer_name}`,
        });
  
        change = false;
        setTimeout(change_to, 61000);
      }
      if (prayer_time_calc === time_now + 15) {
        hours = parseInt(prayer_time_calc / 60);
        minutes = prayer_time_calc - hours * 60;
  
        new Notification("It's almost time to pray", {
          body: `${prayer_name} at ${hours}:${minutes}`,
        });
        change = false;
        setTimeout(change_to, 61000);
      }
    }
  };
  */

  ///////////////////////////////////
  //updating prayer times every 10s//
  ///////////////////////////////////

  const get_time_to_repeat = function () {
    get_time_to(duhr_time, duhr_time_to, prayer_time_to_duhr_el);
    get_time_to(zawaal_time, zawaal_time_to, prayer_time_to_zawaal_el);
    get_time_to(fajr_time, fajr_time_to, prayer_time_to_fajr_el);
    get_time_to(asr_time, asr_time_to, prayer_time_to_asr_el);
    get_time_to(maghrib_time, maghrib_time_to, prayer_time_to_maghrib_el);
    get_time_to(isha_time, isha_time_to, prayer_time_to_isha_el);
    get_time_to(sunrise_time, sunrise_time_to, prayer_time_to_sunrise_el);
    get_time_to(midnight_time, midnight_time_to, prayer_time_to_midnight_el);
    get_time_to(imsak_time, imsak_time_to, prayer_time_to_imsak_el);
    get_time_to(sunset_time, sunset_time_to, prayer_time_to_sunset_el);
    get_time_to_next();
    //change_next_prayer()
  };
  get_time_to_repeat();
  scroll_to_next_prayer();

  setInterval(get_time_to_repeat, 1000);

  //updating musjid time maghrib
  musjid_maghrib_time = `${maghrib_time[0]}:${maghrib_time[1]}`;

  ////////////////////
  //settings section//
  ////////////////////

  //important functions

  const change_settings = function () {
    document.querySelectorAll(".nav-box").forEach(function (el) {
      el.classList.remove("open-nav");
    });

    document.querySelector(".setting-nav-box").classList.add("open-nav");
  };

  const change_prayer = function () {
    document.querySelectorAll(".nav-box").forEach(function (el) {
      el.classList.remove("open-nav");
    });

    document.querySelector(".prayer-nav-box").classList.add("open-nav");
  };

  const change_dhikr = function () {
    document.querySelectorAll(".nav-box").forEach(function (el) {
      el.classList.remove("open-nav");
    });

    document.querySelector(".dhikr-nav-box").classList.add("open-nav");
  };

  const change_qibla = function () {
    document.querySelectorAll(".nav-box").forEach(function (el) {
      el.classList.remove("open-nav");
    });

    document.querySelector(".qibla-nav-box").classList.add("open-nav");
  };

  //expanding settings

  document.querySelectorAll(".setting").forEach(function (el) {
    el.addEventListener("click", function (e) {
      document.querySelectorAll(".setting-bottom-half").forEach(function (el) {
        el.classList.add("hidden4");
      });

      document
        .querySelector(".setting-pop-up-box")
        .classList.remove("hidden-pop-up");

      document
        .querySelector(`.setting-main-box .${el.classList[0]}`)
        .scrollIntoView();
      document
        .querySelector(`.setting-main-box .${el.classList[0]}`)
        .classList.remove("hidden4");
    });
  });

  document
    .querySelector(".setting-pop-up-box")
    .addEventListener("click", function (e) {
      if (e.target === document.querySelector(".setting-pop-up-box")) {
        document
          .querySelector(".setting-pop-up-box")
          .classList.add("hidden-pop-up");
      }
    });

  //asr calculation method setting
  document
    .querySelector(".asr-hanafi-choice")
    .addEventListener("click", function () {
      document.querySelector(".asr-hanafi-choice").style.backgroundColor =
        secondary_color;
      document.querySelector(".asr-hanafi-choice").style.color = primary_color;

      document.querySelector(".asr-standard-choice").style.backgroundColor =
        "transparent";
      document.querySelector(".asr-standard-choice").style.color =
        secondary_color;

      set_cookie("asr_calculation=Hanafi;");
    });

  document
    .querySelector(".asr-standard-choice")
    .addEventListener("click", function () {
      document.querySelector(".asr-standard-choice").style.backgroundColor =
        secondary_color;
      document.querySelector(".asr-standard-choice").style.color =
        primary_color;

      document.querySelector(".asr-hanafi-choice").style.backgroundColor =
        "transparent";
      document.querySelector(".asr-hanafi-choice").style.color =
        secondary_color;

      set_cookie("asr_calculation=Standard;");
    });

  //prayer times calculation method setting
  document.querySelectorAll(".calculation-choice").forEach(function (box) {
    box.addEventListener("click", function () {
      set_cookie(
        `calculation-method=${
          box.querySelector(".calculation-name").textContent
        };`
      );

      document.querySelectorAll(".calculation-choice").forEach(function (box2) {
        box2.style.backgroundColor = "transparent";
        box2.style.color = secondary_color;
      });

      box.style.backgroundColor = secondary_color;
      box.style.color = primary_color;
    });
  });

  //feedback and help setting
  document
    .querySelector(".send-feedback-action")
    .addEventListener("click", function () {
      window.open(
        "mailto:admin@waykode.com?subject=Feedback&body=Your app is fantastic!"
      );
    });

  document
    .querySelector(".cookie-open-box")
    .addEventListener("click", function () {
      document.querySelector(".intro-box").style.transform =
        "translate(0, -100dvh)";
      document.querySelector(".intro-box").style.opacity = "1";
      document.querySelector(".intro-cookies").scrollIntoView();

      document.querySelector(".intro-done-box").style.pointerEvents = "auto";
      document.querySelector(".intro").style.pointerEvents = "auto";

      document
        .querySelector(".intro-done-box")
        .addEventListener("click", function () {
          document.querySelector(".intro-box").style.transform =
            "translate(0, 0)";
          document.querySelector(".intro-box").style.opacity = "0";

          document.querySelector(".intro-done-box").style.pointerEvents =
            "none";
          document.querySelector(".intro").style.pointerEvents = "none";
        });
    });

  //navigation animation
  document
    .querySelector(".setting-nav-box")
    .addEventListener("click", function () {
      document.querySelector(".settings-section").scrollIntoView();

      change_settings();
    });

  document
    .querySelector(".prayer-nav-box")
    .addEventListener("click", function () {
      change_prayer();
      document.querySelector(".prayer-times-section").scrollIntoView();
    });

  document
    .querySelector(".dhikr-nav-box")
    .addEventListener("click", function () {
      //expanding dhikr add
      if (
        document.querySelector(".dhikr-nav-box").classList.contains("open-nav")
      ) {
        document
          .querySelector(".dhikr-add-task-pop-up")
          .classList.add("expand-dhikr");
      } else {
        document.querySelector(".dhikr-section").scrollIntoView();

        change_dhikr();
      }
    });

  document
    .querySelector(".qibla-nav-box")
    .addEventListener("click", function () {
      document.querySelector(".qibla-section").scrollIntoView();

      request_permission();
      change_qibla();
      getLocationAndStart();
    });

  change_prayer();

  //settings adjust

  for (let i = 0; i < 10; i++) {
    document.querySelectorAll(".adjust-time")[i].textContent =
      prayer_times_adj[i];

    document
      .querySelectorAll(".adjust-box")
      [i].addEventListener("click", function () {
        //showing time-picker
        document
          .querySelector(".dhikr-time-picker-pop-up")
          .classList.remove("hidden-rec");

        document.querySelector(".dhikr-time-hours input").value = document
          .querySelectorAll(".adjust-time")
          [i].textContent.split(":")[0];
        document.querySelector(".dhikr-time-minutes input").value = document
          .querySelectorAll(".adjust-time")
          [i].textContent.split(":")[1];

        //resetting edits
        document
          .querySelector(".dhikr-time-cancel")
          .addEventListener("click", function () {
            document
              .querySelector(".dhikr-time-picker-pop-up")
              .classList.add("hidden-rec");

            document.querySelector(
              ".dhikr-time-hours input"
            ).style.outline = `none`;
            document.querySelector(
              ".dhikr-time-minutes input"
            ).style.outline = `none`;

            //resetting edits
            document.cookie = `${
              document.querySelectorAll(".adjust-box")[i].classList[0]
            }-adjust=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            document.querySelectorAll(".adjust-time")[i].textContent = "--:--";
          });

        //saving edits
        document
          .querySelector(".dhikr-time-save")
          .addEventListener("click", function () {
            let hours = parseInt(
              document.querySelector(".dhikr-time-hours input").value
            );
            let minutes = parseInt(
              document.querySelector(".dhikr-time-minutes input").value
            );

            if (hours >= 0 && hours <= 24 && minutes >= 0 && minutes <= 59) {
              document.querySelector(
                ".dhikr-time-hours input"
              ).style.outline = `none`;
              document.querySelector(
                ".dhikr-time-minutes input"
              ).style.outline = `none`;

              prayer_time_calc = hours * 60 + minutes;
              time_now =
                parseInt(prayer_times2[i].split(":")[0]) * 60 +
                parseInt(prayer_times2[i].split(":")[1]);

              prayer_time_calc = prayer_time_calc - time_now;

              set_cookie(
                `${
                  document.querySelectorAll(".adjust-box")[i].classList[0]
                }-adjust=${prayer_time_calc};`
              );

              hours = parseInt((time_now + prayer_time_calc) / 60);
              minutes = time_now + prayer_time_calc - hours * 60;
              document.querySelectorAll(".adjust-time")[i].textContent = `${
                hours <= 9 ? "0" + hours : hours
              }:${minutes <= 9 ? "0" + minutes : minutes}`;

              document
                .querySelector(".dhikr-time-picker-pop-up")
                .classList.add("hidden-rec");
            } else {
              document.querySelector(
                ".dhikr-time-hours input"
              ).style.outline = `${secondary_color} solid 0.8vw`;
              document.querySelector(
                ".dhikr-time-minutes input"
              ).style.outline = `${secondary_color} solid 0.8vw`;
            }
          });
      });
  }

  //hiding time picker
  document
    .querySelector(".dhikr-time-close")
    .addEventListener("click", function () {
      document
        .querySelector(".dhikr-time-picker-pop-up")
        .classList.add("hidden-rec");

      document.querySelector(".dhikr-time-hours input").style.outline = `none`;
      document.querySelector(
        ".dhikr-time-minutes input"
      ).style.outline = `none`;
    });

  //theme changer
  //colour picker
  // Global state for current color in HSV model

  function hexToHsv(hex) {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, "");

    // Convert HEX to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Normalize RGB values to the range [0,1]
    (r /= 255), (g /= 255), (b /= 255);

    // Find max and min RGB values
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;

    // Calculate Hue
    let h = 0;
    if (delta !== 0) {
      if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }

    // Calculate Saturation
    let s = max === 0 ? 0 : (delta / max) * 100;

    // Calculate Value
    let v = max * 100;

    return { h, s: Math.round(s), v: Math.round(v) };
  }

  let currentHue = 0;
  let currentSat = 0;
  let currentVal = 100;
  let colourToChange;

  // DOM element references
  const closePickerBtn = document.getElementById("closePicker");
  const tabButtons = document.querySelectorAll(".tab");
  const gridContainer = document.getElementById("gridTab");
  const spectrumContainer = document.querySelector(".spectrum-container");
  const spectrumIndicator = document.getElementById("spectrumIndicator");
  const spectrumBrightnessOverlay = document.getElementById(
    "spectrumBrightnessOverlay"
  );
  const rSlider = document.getElementById("rSlider");
  const gSlider = document.getElementById("gSlider");
  const bSlider = document.getElementById("bSlider");
  const rInput = document.getElementById("rInput");
  const gInput = document.getElementById("gInput");
  const bInput = document.getElementById("bInput");
  const brightnessSlider = document.getElementById("brightnessSlider");
  const colorWell = document.getElementById("currentColorWell");
  const swatchesContainer = document.getElementById("swatches");
  const addSwatchBtn = document.getElementById("addSwatchBtn");

  // Utility: Convert HSV (h:0-360, s:0-100, v:0-100) to RGB {r,g,b} (0-255)
  function hsvToRgb(h, s, v) {
    s /= 100;
    v /= 100;
    let c = v * s;
    let hh = h / 60;
    let x = c * (1 - Math.abs((hh % 2) - 1));
    let m = v - c;
    let rPrime, gPrime, bPrime;
    if (hh >= 0 && hh < 1) {
      rPrime = c;
      gPrime = x;
      bPrime = 0;
    } else if (hh < 2) {
      rPrime = x;
      gPrime = c;
      bPrime = 0;
    } else if (hh < 3) {
      rPrime = 0;
      gPrime = c;
      bPrime = x;
    } else if (hh < 4) {
      rPrime = 0;
      gPrime = x;
      bPrime = c;
    } else if (hh < 5) {
      rPrime = x;
      gPrime = 0;
      bPrime = c;
    } else {
      rPrime = c;
      gPrime = 0;
      bPrime = x;
    }
    // Convert to 0-255 range
    return {
      r: Math.round((rPrime + m) * 255),
      g: Math.round((gPrime + m) * 255),
      b: Math.round((bPrime + m) * 255),
    };
  }

  // Utility: Convert RGB (0-255 each) to HSV {h, s, v}
  function rgbToHsv(r, g, b) {
    let rp = r / 255,
      gp = g / 255,
      bp = b / 255;
    let max = Math.max(rp, gp, bp),
      min = Math.min(rp, gp, bp);
    let h,
      s,
      v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case rp:
          h = (gp - bp) / d + (gp < bp ? 6 : 0);
          break;
        case gp:
          h = (bp - rp) / d + 2;
          break;
        case bp:
          h = (rp - gp) / d + 4;
          break;
      }
      h *= 60;
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }

  // Utility: Convert RGB to hex string (e.g. {r:255,g:0,b:0} -> "#ff0000")
  function rgbToHex(r, g, b) {
    let rh = r.toString(16).padStart(2, "0");
    let gh = g.toString(16).padStart(2, "0");
    let bh = b.toString(16).padStart(2, "0");
    return `#${rh}${gh}${bh}`;
  }

  // Utility: Update all UI elements to reflect the current color state
  function updateUI() {
    // Compute RGB from current HSV
    const rgb = hsvToRgb(currentHue, currentSat, currentVal);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    // Update color well background
    colorWell.style.backgroundColor = hex;
    // Update brightness slider position (if not already synced)
    brightnessSlider.value = currentVal;
    // Update brightness overlay opacity for spectrum view
    spectrumBrightnessOverlay.style.opacity = 1 - currentVal / 100;
    // Update spectrum indicator position (based on hue and saturation)
    if (spectrumContainer) {
      const rect = spectrumContainer.getBoundingClientRect();
      const x = (currentHue / 360) * rect.width;
      const y = (currentSat / 100) * rect.height;
      spectrumIndicator.style.left = `${x}px`;
      spectrumIndicator.style.top = `${y}px`;
    }
    // Update RGB sliders and numeric inputs
    rSlider.value = rgb.r;
    rInput.value = rgb.r;
    gSlider.value = rgb.g;
    gInput.value = rgb.g;
    bSlider.value = rgb.b;
    bInput.value = rgb.b;
    // Highlight matching swatch or grid cell if any exactly matches current color
    // Remove any previous highlights
    document
      .querySelectorAll(".selected")
      .forEach((elem) => elem.classList.remove("selected"));
    // Highlight swatch if found
    const swatchMatch = swatchesContainer.querySelector(
      `.swatch[data-color="${hex}"]`
    );
    if (swatchMatch && !swatchMatch.classList.contains("add-swatch-btn")) {
      swatchMatch.classList.add("selected");
    }
    // Highlight grid cell if found
    const cellMatch = gridContainer.querySelector(
      `.color-cell[data-color="${hex}"]`
    );
    if (cellMatch) {
      cellMatch.classList.add("selected");
    }

    //update colour
    if (colourToChange) {
      if (colourToChange === "primary") {
        set_cookie(`primary_color=${hex};`);

        primary_color = hex;
        primary_text_color = hex;
      }
      if (colourToChange === "secondary") {
        set_cookie(`secondary_color=${hex};`);

        secondary_border_color = hex;
        secondary_color = hex;
        secondary_text_color = hex;
      }

      update_theme();
      change_settings();
      getLunarPhase(new Date());
      select_method();
      get_current_date_cal();
      change_theme();

      document.querySelector(".theme-primary-choice").style.backgroundColor =
        primary_color;
      document.querySelector(".theme-secondary-choice").style.backgroundColor =
        secondary_color;
    }
  }

  // Generate the Grid tab color cells (similar to iOS preset palette)
  function populateGrid() {
    const gridColors = [];
    // Define grayscale row (8 shades from white to black)
    const grayShades = [
      "#ffffff",
      "#e5e5e5",
      "#bfbfbf",
      "#8c8c8c",
      "#666666",
      "#404040",
      "#1a1a1a",
      "#000000",
    ];
    grayShades.forEach((hex) => gridColors.push(hex));
    // Define hue values for columns (8 distinct hues)
    const hues = [0, 30, 60, 120, 180, 240, 300, 330];
    // Define 5 rows of color with varying saturation/brightness
    const colorRows = [
      { s: 30, v: 100 }, // light pastel
      { s: 60, v: 100 }, // medium pastel
      { s: 100, v: 100 }, // fully saturated bright
      { s: 100, v: 70 }, // semi-bright, saturated
      { s: 100, v: 40 }, // dark, saturated
    ];
    colorRows.forEach((row) => {
      hues.forEach((hue) => {
        const { r, g, b } = hsvToRgb(hue, row.s, row.v);
        gridColors.push(rgbToHex(r, g, b));
      });
    });
    // Create cell elements for each color
    gridColors.forEach((hex) => {
      const cell = document.createElement("div");
      cell.className = "color-cell";
      cell.style.backgroundColor = hex;
      cell.setAttribute("data-color", hex);
      gridContainer.appendChild(cell);
    });
  }

  // Initialize grid on page load
  populateGrid();

  // ---- Event Handlers ---- //

  //changing theme

  //changing default
  document.querySelector(".theme-primary-choice").style.backgroundColor =
    primary_color;
  document.querySelector(".theme-secondary-choice").style.backgroundColor =
    secondary_color;
  //

  document.querySelectorAll(".theme-choice").forEach(function (box) {
    box.addEventListener("click", function (e) {
      //opening pop-up
      document
        .querySelector(".colour-picker-pop-up")
        .classList.remove("hidden-pop-up");

      //changes colour
      if (e.target.classList.contains("theme-primary-choice")) {
        colourToChange = "primary";
      } else {
        colourToChange = "secondary";
      }
    });
  });

  document.querySelector(".theme-reset").addEventListener("click", function () {
    set_cookie(`primary_color=#161925;`);
    set_cookie(`secondary_color=#ecba82;`);

    primary_color = "#161925";
    primary_text_color = "#161925";

    secondary_border_color = "#ecba82";
    secondary_color = "#ecba82";
    secondary_text_color = "#ecba82";

    //changing default
    document.querySelector(".theme-primary-choice").style.backgroundColor =
      primary_color;
    document.querySelector(".theme-secondary-choice").style.backgroundColor =
      secondary_color;

    update_theme();
    getLunarPhase(new Date());
    change_settings();
    select_method();
    get_current_date_cal();
    change_theme();
  });

  /*get height for tabs*/
  document
    .querySelector(".colour-picker-pop-up")
    .style.setProperty(
      "--tab-height",
      `${document.querySelector(".color-cell").offsetWidth * 6}px`
    );

  // Close the color picker
  function closeColorPicker() {
    document
      .querySelector(".colour-picker-pop-up")
      .classList.add("hidden-pop-up");
  }

  closePickerBtn.addEventListener("click", closeColorPicker);
  document
    .querySelector(".colour-picker-close")
    .addEventListener("click", closeColorPicker);

  // Tab switching (Grid, Spectrum, Sliders)
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Switch active tab button
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // Switch tab content
      const targetTabId = btn.getAttribute("data-tab") + "Tab";
      document.querySelectorAll(".tab-content").forEach((tab) => {
        if (tab.id === targetTabId) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
    });
  });

  // Handle color selection from Grid tab
  gridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("color-cell")) {
      // Get the selected color from the cell
      const hex = e.target.getAttribute("data-color");
      // Convert hex to HSV for global state
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      const hsv = rgbToHsv(r, g, b);
      currentHue = hsv.h;
      currentSat = hsv.s;
      currentVal = hsv.v;
      updateUI();
    }
  });

  // Handle color picking on Spectrum tab (mouse and touch support)
  let isPicking = false;
  function pickColorAt(x, y) {
    // Clamp coordinates within the spectrum area
    const rect = spectrumContainer.getBoundingClientRect();
    const relX = Math.max(0, Math.min(x - rect.left, rect.width));
    const relY = Math.max(0, Math.min(y - rect.top, rect.height));
    // Calculate hue and saturation from position
    const newHue = (relX / rect.width) * 360;
    const newSat = (relY / rect.height) * 100;
    currentHue = Math.round(newHue);
    currentSat = Math.round(newSat);
    // Note: currentVal (brightness) remains unchanged so that brightness slider setting is respected
    updateUI();
  }
  spectrumContainer.addEventListener("mousedown", (e) => {
    isPicking = true;
    pickColorAt(e.clientX, e.clientY);
  });
  spectrumContainer.addEventListener("mousemove", (e) => {
    if (isPicking) {
      pickColorAt(e.clientX, e.clientY);
    }
  });
  document.addEventListener("mouseup", () => {
    isPicking = false;
  });
  // Touch events for mobile
  spectrumContainer.addEventListener("touchstart", (e) => {
    isPicking = true;
    const touch = e.touches[0];
    pickColorAt(touch.clientX, touch.clientY);
  });
  spectrumContainer.addEventListener("touchmove", (e) => {
    if (isPicking) {
      const touch = e.touches[0];
      pickColorAt(touch.clientX, touch.clientY);
    }
  });
  document.addEventListener("touchend", () => {
    isPicking = false;
  });

  // Handle slider changes (RGB Sliders)
  function onRGBInputChange() {
    // Read slider values
    const r = parseInt(rSlider.value);
    const g = parseInt(gSlider.value);
    const b = parseInt(bSlider.value);
    // Update numeric inputs to match sliders (if user dragged slider)
    rInput.value = r;
    gInput.value = g;
    bInput.value = b;
    // Convert to HSV and update current color state
    const hsv = rgbToHsv(r, g, b);
    currentHue = hsv.h;
    currentSat = hsv.s;
    currentVal = hsv.v;
    updateUI();
  }
  rSlider.addEventListener("input", onRGBInputChange);
  gSlider.addEventListener("input", onRGBInputChange);
  bSlider.addEventListener("input", onRGBInputChange);
  // Also handle when user types values in the number inputs
  function onRGBNumberChange() {
    // Clamp and sync values between number input and slider
    let r = parseInt(rInput.value) || 0;
    let g = parseInt(gInput.value) || 0;
    let b = parseInt(bInput.value) || 0;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    rSlider.value = r;
    rInput.value = r;
    gSlider.value = g;
    gInput.value = g;
    bSlider.value = b;
    bInput.value = b;
    // Convert to HSV and update
    const hsv = rgbToHsv(r, g, b);
    currentHue = hsv.h;
    currentSat = hsv.s;
    currentVal = hsv.v;
    updateUI();
  }
  rInput.addEventListener("change", onRGBNumberChange);
  gInput.addEventListener("change", onRGBNumberChange);
  bInput.addEventListener("change", onRGBNumberChange);

  // Handle brightness slider changes
  brightnessSlider.addEventListener("input", () => {
    currentVal = parseInt(brightnessSlider.value);
    // Update current color brightness and UI (preserve hue and sat)
    updateUI();
  });

  // Eyedropper tool to pick color from anywhere on screen (if supported)
  /*
eyeDropperBtn.addEventListener('click', async () => {
  if (!window.EyeDropper) {
    alert("Eyedropper API is not supported in this browser.");
    return;
  }
  try {
    // Hide the color picker modal so underlying content is accessible
    colorPickerModal.classList.add('hidden');
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    if (result.sRGBHex) {
      // Got a color from the eyedropper
      const hex = result.sRGBHex;
      // Convert picked color to HSV and update state
      const r = parseInt(hex.substr(1,2), 16);
      const g = parseInt(hex.substr(3,2), 16);
      const b = parseInt(hex.substr(5,2), 16);
      const hsv = rgbToHsv(r, g, b);
      currentHue = hsv.h;
      currentSat = hsv.s;
      currentVal = hsv.v;
      updateUI();
    }
  } catch (err) {
    console.warn("Eyedropper canceled or failed:", err);
  } finally {
    // Show the color picker modal again
    colorPickerModal.classList.remove('hidden');
  }
});
*/

  // Handle adding current color to swatches (favorites)
  addSwatchBtn.addEventListener("click", () => {
    const rgb = hsvToRgb(currentHue, currentSat, currentVal);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    // Avoid duplicates: if this color already saved, do nothing
    if (swatchesContainer.querySelector(`.swatch[data-color="${hex}"]`)) {
      return;
    }
    // Create a new swatch element
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.setAttribute("data-color", hex);
    swatch.style.backgroundColor = hex;
    // Insert the new swatch before the "+" button
    swatchesContainer.insertBefore(swatch, addSwatchBtn);
  });

  // Handle swatch click (select a saved color)
  swatchesContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("swatch") &&
      !e.target.classList.contains("add-swatch-btn")
    ) {
      const hex = e.target.getAttribute("data-color");
      // Convert hex to HSV and update current state
      const r = parseInt(hex.substr(1, 2), 16);
      const g = parseInt(hex.substr(3, 2), 16);
      const b = parseInt(hex.substr(5, 2), 16);
      const hsv = rgbToHsv(r, g, b);
      currentHue = hsv.h;
      currentSat = hsv.s;
      currentVal = hsv.v;
      updateUI();
    }
  });

  // Set initial color state (matching the default slider values: #ff3b30)
  (function init() {
    // Using the initial R,G,B from sliders to set current color
    const r = parseInt(rSlider.value);
    const g = parseInt(gSlider.value);
    const b = parseInt(bSlider.value);
    const hsv = rgbToHsv(r, g, b);
    currentHue = hsv.h;
    currentSat = hsv.s;
    currentVal = hsv.v;
    updateUI();
  })();

  /////////
  //dhikr//
  /////////
  //setting dhikr scale variable

  all_dhikrs =
    get_cookie("dhikrs") !== null ? JSON.parse(get_cookie("dhikrs")) : [];
  names = get_cookie("dhikrs") !== null ? JSON.parse(get_cookie("dhikrs")) : [];
  total_dhikrs = all_dhikrs.length;

  dhikr_total =
    get_cookie("dhikr_total") !== null
      ? JSON.parse(get_cookie("dhikr_total"))
      : [];
  dhikr_done =
    get_cookie("dhikr_done") !== null
      ? JSON.parse(get_cookie("dhikr_done"))
      : [];

  repeats =
    get_cookie("repeats") !== null ? JSON.parse(get_cookie("repeats")) : [];

  let current_el;

  const update_percent = function () {
    let total_percent = 0;
    for (let i = 0; i < dhikr_total.length; i++) {
      total_percent += (Number(dhikr_done[i]) / Number(dhikr_total[i])) * 100;
    }

    total_percent = parseInt(total_percent / Number(total_dhikrs));
    document.querySelector(".percent-text").textContent = total_percent || 0;
    document.querySelector(".percent-progress").style.width = `${
      total_percent || 0
    }%`;
  };

  const update_dhikr_theme = function () {
    document
      .querySelectorAll(".dhikr-section .secondary-text")
      .forEach(function (el) {
        el.style.color = secondary_text_color;
      });
    document
      .querySelectorAll(".dhikr-section .primary-text")
      .forEach(function (el) {
        el.style.color = primary_text_color;
      });
    document
      .querySelectorAll(".dhikr-section .secondary")
      .forEach(function (el) {
        el.style.backgroundColor = secondary_color;
      });
    document.querySelectorAll(".dhikr-section .primary").forEach(function (el) {
      el.style.backgroundColor = primary_color;
    });

    document
      .querySelectorAll(".dhikr-section .secondary-border")
      .forEach(function (el) {
        el.style.borderColor = secondary_border_color;
      });

    document
      .querySelectorAll(".dhikr-section .secondary-blur")
      .forEach(function (el) {
        el.style.backgroundColor = `${secondary_color}22`;
      });
  };

  const add_event_listeners_dhikr = function () {
    document.querySelectorAll(".dhikr-option-icon").forEach(function (el) {
      el.addEventListener("click", function () {
        el.parentElement.parentElement
          .querySelector(".dhikr-box-top")
          .classList.add("hidden6");
        el.parentElement.parentElement
          .querySelector(".dhikr-box-bottom")
          .classList.add("hidden6");
        el.parentElement.parentElement
          .querySelector(".dhikr-context")
          .classList.remove("hidden6");

        document
          .querySelector(".navigation-box")
          .addEventListener("click", function () {
            document.querySelectorAll(".dhikr-box-top").forEach(function (el) {
              el.classList.remove("hidden6");
            });
            document
              .querySelectorAll(".dhikr-box-bottom")
              .forEach(function (el) {
                el.classList.remove("hidden6");
              });
            document.querySelectorAll(".dhikr-context").forEach(function (el) {
              el.classList.add("hidden6");
            });
          });
      });
    });

    document.querySelectorAll(".close-context-box").forEach(function (el) {
      el.addEventListener("click", function () {
        document.querySelectorAll(".dhikr-box-top").forEach(function (el) {
          el.classList.remove("hidden6");
        });
        document.querySelectorAll(".dhikr-box-bottom").forEach(function (el) {
          el.classList.remove("hidden6");
        });
        document.querySelectorAll(".dhikr-context").forEach(function (el) {
          el.classList.add("hidden6");
        });
      });
    });

    document.querySelectorAll(".delete").forEach(function (el) {
      el.addEventListener("click", function (el) {
        const name =
          el.target.parentElement.parentElement.querySelector(
            ".dhikr-name"
          ).textContent;
        for (let i = 0; i < names.length; i++) {
          if (names[i] === name) {
            all_dhikrs.splice(i, 1);
            dhikr_total.splice(i, 1);
            dhikr_done.splice(i, 1);
            names.splice(i, 1);
            total_dhikrs = total_dhikrs - 1;

            unScheduleNoti(i);

            update_percent();
          }
        }

        el.target.parentElement.parentElement.remove();

        if (document.querySelector(".main-dhikr").children.length === 1) {
          //showing dhikr-intro
          document
            .querySelector(".dhikr-intro")
            .classList.remove("hidden-intro");
        }

        updateCookies();
      });
    });

    document.querySelectorAll(".dhikr-box").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (
          el.querySelector(".dhikr-context").classList.contains("hidden6") &&
          e.target.classList.contains("part-context") !== true
        ) {
          document
            .querySelector(".dhikr-pop-up")
            .style.setProperty(
              "--dhikr-animation-start",
              `${
                el.offsetTop -
                document.querySelector(".dhikr-section").scrollTop
              }px`
            );
          document
            .querySelector(".dhikr-pop-up")
            .classList.remove("hidden-counter");

          document.querySelector(".counter-done").textContent = el
            .querySelector(".dhikr-done")
            .textContent.split("/")[0];
          document.querySelector(".counter-total").textContent = `/${
            el.querySelector(".dhikr-done").textContent.split("/")[1]
          }`;
          current_el = el;

          document.querySelector(".counter-progress").style.width = `${
            (el.querySelector(".dhikr-done").textContent.split("/")[0] /
              el.querySelector(".dhikr-done").textContent.split("/")[1]) *
            100
          }%`;
        }
      });
    });
  };

  const create_all_dhikrs = function () {
    for (let i = 0; i < Number(total_dhikrs); i++) {
      //hiding dhikr-intro
      document.querySelector(".dhikr-intro").classList.add("hidden-intro");

      //creating dhikr box and children
      const temp = all_dhikrs[i];
      all_dhikrs[i] = document.createElement("div");
      all_dhikrs[i].classList.add(`dhikr-${temp}`);
      all_dhikrs[i].classList.add("dhikr-box");
      all_dhikrs[i].classList.add("secondary-blur");

      all_dhikrs[i].innerHTML = `<div class="dhikr-box-top">
              <div class="dhikr-name secondary-text">${temp}</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dhikr-option-icon secondary-text">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div class="dhikr-box-bottom">
              <div class="dhikr-progress-box secondary-blur"><div class="dhikr-progress-bar secondary"></div></div>

              <div class="dhikr-progress-info">
                <div class="dhikr-done secondary-text">${dhikr_done[i]}/${
        dhikr_total[i]
      }</div>
                <div class="dhikr-percent secondary-text">${parseInt(
                  (dhikr_done[i] / dhikr_total[i]) * 100
                )}%</div>
              </div>
            </div>
           <div class="dhikr-context hidden6 part-context">
           <div class="close-context-box part-context">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="close-context part-context secondary-text">
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                </svg>
            </div>
            <div class="delete part-context secondary-text">Delete</div>
          </div>`;

      document.querySelector(".main-dhikr").appendChild(all_dhikrs[i]);
      document.querySelector(
        `.dhikr-${temp} .dhikr-progress-bar`
      ).style.width = `${(dhikr_done[i] / dhikr_total[i]) * 100}%`;

      add_event_listeners_dhikr();

      update_percent();
      update_dhikr_theme();
    }
  };

  const create_new_dhikr = function () {
    let name =
      document.querySelector(".dhikr-name-input").value !== ""
        ? document
            .querySelector(".dhikr-name-input")
            .value.replace(/[^a-zA-Z0-9!#$%&'()*+,\-./:<=>?@[\]^_`{|}~]/g, "")
        : " ";
    for (let i = 0; i < name.length; i++) {
      //verifying name
      if (names[i] === name || name === " ") {
        document.querySelector(".dhikr-name-select").style.animationPlayState =
          "running";

        setTimeout(function () {
          document.querySelector(
            ".dhikr-name-select"
          ).style.animationPlayState = "paused";
        }, 450);
        return;
      }
    }
    document
      .querySelector(".dhikr-add-task-pop-up")
      .classList.remove("expand-dhikr");

    const total =
      document.querySelector(".dhikr-total-input").value !== ""
        ? document
            .querySelector(".dhikr-total-input")
            .value.replace(/[^a-zA-Z0-9!#$%&'()*+,\-./:<=>?@[\]^_`{|}~]/g, "")
        : 100;

    //creating dhikr
    document.querySelector(".dhikr-intro").classList.add("hidden-intro");

    all_dhikrs.push(name);
    names.push(name);
    dhikr_total.push(total);
    dhikr_done.push(0);
    total_dhikrs = all_dhikrs.length;

    //scheduling notification
    schdeuleDhikrNoti();
    //

    updateCookies();

    all_dhikrs[total_dhikrs - 1] = document.createElement("div");
    all_dhikrs[total_dhikrs - 1].classList.add(`dhikr-${name}`);
    all_dhikrs[total_dhikrs - 1].classList.add("dhikr-box");
    all_dhikrs[total_dhikrs - 1].classList.add("secondary-blur");

    all_dhikrs[total_dhikrs - 1].innerHTML = `<div class="dhikr-box-top">
              <div class="dhikr-name secondary-text">${name}</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dhikr-option-icon secondary-text">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div class="dhikr-box-bottom">
              <div class="dhikr-progress-box secondary-blur"><div class="dhikr-progress-bar secondary"></div></div>

              <div class="dhikr-progress-info">
                <div class="dhikr-done secondary-text">${
                  dhikr_done[total_dhikrs - 1]
                }/${dhikr_total[total_dhikrs - 1]}</div>
                <div class="dhikr-percent secondary-text">${
                  (dhikr_done[total_dhikrs - 1] /
                    dhikr_total[total_dhikrs - 1]) *
                  100
                }%</div>
              </div>
            </div>
            <div class="dhikr-context hidden6 part-context">
            <div class="close-context-box part-context">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="close-context part-context secondary-text">
                    <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                </svg>
            </div>
            <div class="delete part-context secondary-text">Delete</div>
          </div>
          `;

    document
      .querySelector(".main-dhikr")
      .appendChild(all_dhikrs[total_dhikrs - 1]);
    document.querySelector(
      `.dhikr-${name} .dhikr-progress-bar`
    ).style.width = `0%`;
    document
      .querySelector(`.dhikr-${name}`)
      .scrollIntoView({ behavior: "smooth" });

    add_event_listeners_dhikr();

    update_percent();
    update_dhikr_theme();
  };

  create_all_dhikrs();

  //adding new dhikr
  document.querySelector(".dhikr-close").addEventListener("click", function () {
    if (
      document
        .querySelector(".dhikr-add-task-pop-up")
        .classList.contains("expand-dhikr")
    ) {
      document
        .querySelector(".dhikr-add-task-pop-up")
        .classList.remove("expand-dhikr");

      document.querySelector(".dhikr-name-input").value = "";
      document.querySelector(".dhikr-total-input").value = "";
    }
  });

  document
    .querySelector(".dhikr-cancel")
    .addEventListener("click", function () {
      if (
        document
          .querySelector(".dhikr-add-task-pop-up")
          .classList.contains("expand-dhikr")
      ) {
        document
          .querySelector(".dhikr-add-task-pop-up")
          .classList.remove("expand-dhikr");

        document.querySelector(".dhikr-name-input").value = "";
        document.querySelector(".dhikr-total-input").value = "";
      }
    });

  document.querySelector(".dhikr-add").addEventListener("click", function () {
    create_new_dhikr();

    document.querySelector(".dhikr-name-input").value = "";
    document.querySelector(".dhikr-total-input").value = "";
  });

  //repeat select **only for ios and adnroid**

  //highlighting 'none'
  document.querySelectorAll(".dhikr-choice")[0].style.color = primary_color;
  document.querySelectorAll(".dhikr-choice")[0].style.backgroundColor =
    secondary_color;
  //

  document
    .querySelector(".dhikr-repeat-select-box")
    .addEventListener("click", function () {
      document.querySelectorAll(".setting-bottom-half").forEach(function (el) {
        el.classList.add("hidden4");
      });

      document
        .querySelector(".setting-pop-up-box")
        .classList.remove("hidden-pop-up");

      document.querySelector(`.dhikr-repeat-pop-up`).scrollIntoView();
      document
        .querySelector(`.dhikr-repeat-pop-up`)
        .classList.remove("hidden4");
    });

  document.querySelectorAll(".dhikr-choice").forEach(function (el) {
    el.addEventListener("click", function () {
      //highlighting repeat value
      document.querySelectorAll(".dhikr-choice").forEach(function (el) {
        el.style.color = secondary_color;
        el.style.backgroundColor = "transparent";
      });

      el.style.color = primary_color;
      el.style.backgroundColor = secondary_color;
      //

      repeat = el.classList[0];

      document
        .querySelector(".setting-pop-up-box")
        .classList.add("hidden-pop-up");
    });
  });

  //expanding dhikr box

  //closing dhikr box
  document
    .querySelector(".dhikr-pop-up-back-box")
    .addEventListener("click", function () {
      current_el.querySelector(".dhikr-done").textContent = `${
        document.querySelector(".counter-done").textContent
      }${document.querySelector(".counter-total").textContent}`;
      current_el.querySelector(".dhikr-progress-bar").style.width = `${
        (document.querySelector(".counter-done").textContent /
          document.querySelector(".counter-total").textContent.split("/")[1]) *
        100
      }%`;
      current_el.querySelector(".dhikr-percent").textContent = `${parseInt(
        (document.querySelector(".counter-done").textContent /
          document.querySelector(".counter-total").textContent.split("/")[1]) *
          100
      )}%`;

      const name2 = current_el.querySelector(".dhikr-name").textContent;

      for (let i = 0; i < names.length; i++) {
        if (names[i] === name2) {
          dhikr_done[i] = document.querySelector(".counter-done").textContent;
          set_cookie([`dhikr_done=${JSON.stringify(dhikr_done)};`]);

          update_percent();
        }
      }

      document.querySelector(".dhikr-pop-up").classList.add("hidden-counter");
    });

  document
    .querySelector(".dhikr-pop-up")
    .addEventListener("touchstart", function (e) {
      if (e.target.classList.contains("dhikr-pop-up-back")) {
        return;
      } else {
        //vibrate
        vibrate();

        //updating counter progress
        document.querySelector(".counter-done").textContent++;
        document.querySelector(".counter-progress").style.width = `${
          (document.querySelector(".counter-done").textContent /
            document
              .querySelector(".counter-total")
              .textContent.split("/")[1]) *
          100
        }%`;

        const name2 = current_el.querySelector(".dhikr-name").textContent;

        for (let i = 0; i < names.length; i++) {
          if (names[i] === name2) {
            dhikr_done[i] = document.querySelector(".counter-done").textContent;
            set_cookie([`dhikr_done=${JSON.stringify(dhikr_done)};`]);
          }
        }

        //deleting if counter progress is 100%
        if (
          document.querySelector(".counter-progress").style.width === "100%"
        ) {
          const name = current_el.querySelector(".dhikr-name").textContent;
          for (let i = 0; i < names.length; i++) {
            if (names[i] === name) {
              all_dhikrs.splice(i, 1);
              dhikr_total.splice(i, 1);
              dhikr_done.splice(i, 1);
              names.splice(i, 1);
              total_dhikrs = total_dhikrs - 1;

              unScheduleNoti(i);

              update_percent();
            }
          }

          current_el.remove();

          if (document.querySelector(".main-dhikr").children.length === 1) {
            //un-hiding dhikr-intro
            document
              .querySelector(".dhikr-intro")
              .classList.remove("hidden-intro");
          }

          updateCookies();

          //document.querySelector(".dhikr-pop-up").style.
          document
            .querySelector(".dhikr-pop-up")
            .classList.add("hidden-counter");
        }
      }
    });

  //recommended dhikr
  let rec_name;
  let rec_total;

  document.querySelectorAll(".recommended").forEach(function (el) {
    el.addEventListener("click", function () {
      document
        .querySelector(".recommended-pop-up-box")
        .classList.remove("hidden-rec");

      rec_name = el.querySelector(".recommended-name").textContent;
      rec_total = el.querySelector(".recommended-total").textContent;
    });
  });

  document
    .querySelector(".recommended-pop-up-close")
    .addEventListener("click", function () {
      document
        .querySelector(".recommended-pop-up-box")
        .classList.add("hidden-rec");
    });

  document
    .querySelector(".recommended-cancel")
    .addEventListener("click", function () {
      document
        .querySelector(".recommended-pop-up-box")
        .classList.add("hidden-rec");
    });

  document
    .querySelector(".recommended-add")
    .addEventListener("click", function () {
      document
        .querySelector(".recommended-pop-up-box")
        .classList.add("hidden-rec");

      document.querySelector(".dhikr-name-input").value = rec_name;
      document.querySelector(".dhikr-total-input").value = rec_total;

      create_new_dhikr();

      document.querySelector(".dhikr-name-input").value = "";
      document.querySelector(".dhikr-total-input").value = "";
    });

  /***************/
  /*QIBLA SECTION*/
  /***************/

  // Handle device orientation events (compass heading updates)
  const directionText = document.getElementById("direction");
  const messageText = document.getElementById("message");
  const arrowElem = document.querySelector(".qibla-arrow");
  const compass = document.getElementById("compass");
  const messageExtra = document.querySelector(".message-extra");

  // Coordinates of the Kaaba in Mecca (Qibla)
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  // Calculate Qibla bearing from user location to Kaaba
  function calculateQiblaBearing(userLat, userLon) {
    // Convert degrees to radians
    const lat1 = (userLat * Math.PI) / 180;
    const lon1 = (userLon * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const lon2 = (KAABA_LON * Math.PI) / 180;
    const deltaLon = lon2 - lon1;

    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
    let theta = Math.atan2(y, x); // in radians
    let bearing = (theta * 180) / Math.PI;
    // Normalize to 0-360
    bearing = (bearing + 360) % 360;
    return bearing;
  }

  qiblaBearing = calculateQiblaBearing(latitude, longitude);

  // Format heading (in degrees) into a string like "N 10° E"
  function formatHeading(deg) {
    deg = Math.round(deg); // round to nearest whole degree
    deg = ((deg % 360) + 360) % 360; // normalize 0-359
    if (deg === 0 || deg === 360) return "N";
    if (deg === 90) return "E";
    if (deg === 180) return "S";
    if (deg === 270) return "W";
    let output = "";
    if (deg < 90) {
      // 0 to 90: between North and East
      output = `${deg}° NE`;
    } else if (deg < 180) {
      // 90 to 180: between East and South
      const angle = 180 - deg;
      output = `${angle}° SE`;
    } else if (deg < 270) {
      // 180 to 270: between South and West
      const angle = deg - 180;
      output = `${angle}° SW`;
    } else if (deg < 360) {
      // 270 to 360: between West and North
      const angle = 360 - deg;
      output = `${angle}° NW`;
    }
    return output;
  }

  function onOrientationChange(event) {
    let heading;
    if (event.webkitCompassHeading !== undefined) {
      // Use iOS compass heading if available
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      // On devices where alpha is 0 at North and increases counter-clockwise [oai_citation_attribution:5‡web.dev](https://web.dev/articles/device-orientation#:~:text=The%20rotation%20around%20the%20z,clockwise%2C%20the%20%60alpha%60%20value%20increases)
      if (event.absolute === true || typeof event.absolute === "undefined") {
        // Convert alpha to compass heading (clockwise from North)
        heading = (360 - event.alpha) % 360;
      } else {
        // event.absolute == false: no absolute north reference
        // In this case, the compass is not reliable (e.g., no magnetometer).
        heading = null;
      }
    }
    if (heading === null) {
      // No reliable compass heading available
      return;
    }
    // Update the arrow rotation to point towards Qibla
    const rotation = (360 - heading) % 360;
    compass.style.transform = `rotate(${rotation}deg)`;
    // Update the textual direction indicator (user's current heading)
    directionText.textContent = formatHeading(heading);

    const directionBearing =
      heading >= 180 && qiblaBearing < 180 ? qiblaBearing + 360 : qiblaBearing;
    const directionHeading =
      qiblaBearing >= 180 && heading < 180 ? heading + 360 : heading;

    const turnBearing =
      heading >= 180 + qiblaBearing && qiblaBearing < 180
        ? qiblaBearing + 360
        : qiblaBearing;
    const turnHeading =
      qiblaBearing >= 180 + heading && heading < 180 ? heading + 360 : heading;

    if (
      directionHeading - directionBearing < 22.5 &&
      directionHeading - directionBearing > -22.5
    ) {
      messageText.textContent = `facing the Qibla`;
      messageExtra.textContent = `You're `;
    } else {
      messageExtra.textContent = `Turn `;

      if (turnBearing > turnHeading) {
        messageText.textContent = `right`;
      } else {
        messageText.textContent = `left`;
      }
    }
  }

  // Get geolocation, then handle compass
  async function getLocationAndStart() {
    arrowElem.style.transform = `translate(-50%, 0) rotate(${qiblaBearing}deg)`;

    window.addEventListener("deviceorientation", onOrientationChange, true);
    // Optionally, also try absolute orientation event for better accuracy if supported
    if ("ondeviceorientationabsolute" in window) {
      window.addEventListener(
        "deviceorientationabsolute",
        onOrientationChange,
        true
      );
    }
  }

  //creating ticks for compass
  function createTicks() {
    const compass = document.querySelector(".center-point");
    for (let i = 0; i < 360; i += 6) {
      // Create a tick every 6 degrees
      const tick = document.createElement("div");
      tick.classList.add("tick");
      if (i % 30 === 0) {
        tick.classList.add("large"); // Larger ticks every 30 degrees
      }
      tick.style.transform = `rotate(${i}deg) translate(0, ${
        -38 + (i > 180 ? ((360 - i) / 180) * 3 : (i / 180) * 3)
      }vw)`;
      compass.appendChild(tick);
    }
  }

  createTicks();
};

if (get_cookie("first-intro")) {
  main_app_function();
}
