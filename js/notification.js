const LocalNotifications = Capacitor.Plugins.LocalNotifications;
let noti_data;

const isRepeatPending = async (id) => {
  const notifications = await LocalNotifications.getPending();
  id = Number("2" + id);

  for (let notification of notifications.notifications) {
    if (id === Number(notification.id)) {
      return true;
    }
  }
  return false;
};

//dhikr ids
const repeatIDs =
  get_cookie("repeatIDs") !== null ? JSON.parse(get_cookie("repeatIDs")) : [];

const generateRepeatID = function (id) {
  if (!isRepeatPending(id)) {
    repeatIDs.push(id);
  } else {
    id = Math.floor(Math.random() * 1000) + 30;
    repeatIDs.push(id);
  }

  set_cookie([`repeatIDs=${JSON.stringify(repeatIDs)};`]);
  return id;
};

//notification setup
const today = `${
  months[new Date().getMonth()]
} ${new Date().getDate()}, ${new Date().getFullYear()}`;

const requestNotiPermission = async () => {
  await LocalNotifications.requestPermissions();
};

const cancelNotification = async (id) => {
  try {
    id = repeatIDs[Number(id)];
    if (id) {
      await LocalNotifications.cancel({
        notifications: [{ id }],
      });
      await LocalNotifications.removeDeliveredNotifications({
        notifications: [{ id }],
      });
    }
  } catch (error) {}
};

const scheduleNotification = async (title, body, time, id) => {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: id,
          title: title,
          body: body,
          schedule: {
            at: time,
          },
          sound: " ",
          actionTypeId: "",
          extra: {
            data: "Reminder",
          },
        },
      ],
    });
  } catch (error) {}
};

const scheduleRepeatNotification = async (title, body, every, id) => {
  id = generateRepeatID(Number("3" + id.toString()));

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: id,
          title: title,
          body: body,
          schedule: {
            every: every,
          },
          sound: " ",
          actionTypeId: "",
          extra: {
            data: "Reminder",
          },
        },
      ],
    });
  } catch (error) {}
};

//getting prayer times
const start = async function() {
  const { latitude, longitude } = await get_location();

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

  noti_data = prayTimes.getTimes(
    new Date(),
    [latitude, longitude],
    new Date().getTimezoneOffset() / -60
  );

  //notifications
  const times = [
    noti_data.fajr,
    noti_data.dhuhr,
    noti_data.asr,
    noti_data.maghrib,
    noti_data.isha,
  ];
  const names = ["Fajr", "Duhr", "Asr", "Maghrib", "Isha"];

  for (const time1 in times) {
    const time = Number(time1);

    if (`${new Date().getHours() > 9 ? new Date().getHours() : "0" + new Date().getHours()}:${new Date().getMinutes()}` < times[time]) {
      //scheduling notification
      scheduleNotification(
        names[time],
        `It's ${names[time]} time`,
        new Date(`${today},  ${times[time]}:00`),
        Number(time)
      );
    } else {
      //scheduling notification
      scheduleNotification(
        names[time],
        `It's ${names[time]} time`,
        new Date(
          `${
            months[
              new Date(
                new Date(new Date().setDate(new Date().getDate() + 1))
              ).getMonth()
            ]
          } ${new Date(
            new Date(new Date().setDate(new Date().getDate() + 1))
          ).getDate()}, ${new Date(
            new Date(new Date().setDate(new Date().getDate() + 1))
          ).getFullYear()},  ${times[time]}:00`
        ), //tomorrow's date
        Number(time)
      );
    }
  }
}

if (get_cookie("first-intro")) {
  //setting notifications
  start();
}