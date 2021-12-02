// Import the SQLite module
import SQLite from "sqlite-async";

export async function getEvents() {
  const db = await SQLite.open("db/database");
  const events = await db.all("SELECT * FROM events");
  console.log(events);

  db.close();
  return events;
}

export async function getEventById(id) {
  const db = await SQLite.open("db/database");
  const event = await db.all("SELECT * FROM events where id=? ", [id]);
  console.log(event);

  db.close();
  return event;
}

export async function getDateByEvent() {
  const db = await SQLite.open("db/database");
  const date = await db.all("SELECT * FROM date_by_events");
  console.log(date);

  db.close();
  return date;
}

export async function getAtendees() {
  const db = await SQLite.open("db/database");
  const attendee = await db.all("SELECT * FROM attendees_by_dates");

  console.log(attendee);

  for (let elem of attendee) {
    const date = await db.all(
      "SELECT event_date as date FROM date_by_events WHERE id = ?",
      [elem.date_id]
    );
    elem.date = date;
  }

  db.close();
  return attendee;
}

export async function getAtendeeByName(attendee_name) {
  const db = await SQLite.open("db/database");
  const attendee = await db.all(
    "SELECT * FROM attendees_by_dates WHERE attendee = ?",
    [attendee_name]
  );

  for (let elem of attendee) {
    const date = await db.all(
      "SELECT event_date as date FROM date_by_events WHERE id = ?",
      [elem.date_id]
    );
    elem.date = date;
  }
  console.log(attendee);

  db.close();
  return attendee;
}

let attendee_name = "richard";

export async function addEvent(name, author, description) {
  const db = await SQLite.open("db/database");
  console.log(name, author, description);
  const event = await db.run(
    "INSERT INTO events (event_name,event_author,event_description) VALUES (?,?,?)",
    [name, author, description]
  );
  console.log(event);

  db.close();
  return event;
}

let name = "test";
let author = "arnaud";
let description = "testetestetstetstet";

export async function deleteEvent(id) {
  const db = await SQLite.open("db/database");
  const event = await db.run("DELETE FROM events WHERE id=?", [id]);
  console.log(event);

  db.close();
  return event;
}

export async function addDate(id, date) {
  const db = await SQLite.open("db/database");
  const date_by_events = await db.run(
    "INSERT INTO date_by_events (event_id,event_date) VALUES (?,?)",
    [id, date]
  );
  console.log(date_by_events);

  db.close();
  return date_by_events;
}

let date = "2023-01-01";

export async function addAttendeeToDate(id, name, available) {
  const db = await SQLite.open("db/database");
  const addAttendee = await db.run(
    "INSERT INTO attendees_by_dates (date_id,attendee,available) VALUES (?,?,?)",
    [id, name, available]
  );
  console.log(addAttendee);

  db.close();
  return addAttendee;
}

let name_attendee = "laylow";
// addAttendeeToDate(4, name_attendee, 1);

export async function updateAttendee(available, id) {
  const db = await SQLite.open("db/database");
  const uptadeAttendee = await db.run(
    "UPDATE attendees_by_dates SET available = ? WHERE id=?",
    [available, id]
  );
  console.log(uptadeAttendee);

  db.close();
  return uptadeAttendee;
}

export async function getAllEvents() {
  const db = await SQLite.open("./db/database");

  const allEvents = await db.all(`SELECT * FROM events`);

  for (const event of allEvents) {
    const dates = await db.all(
      `SELECT event_date AS date, id FROM date_by_events WHERE event_id=?`,
      [event.id]
    );

    event.dates = dates;

    for (const date of dates) {
      const attendees = await db.all(
        `SELECT attendee, available FROM attendees_by_dates WHERE date_id=?`,
        [date.id]
      );
      date.attendees = attendees;
    }
  }

  console.log(JSON.stringify(allEvents, null, 2));
  db.close();

  return allEvents;
}
