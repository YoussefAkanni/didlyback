CREATE TABLE events(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    event_name VARCHAR(255) NOT NULL,
    event_author VARCHAR(255) NOT NULL,
    event_description VARCHAR(255) NOT NULL
);

CREATE TABLE date_by_events(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    event_id INT NOT NULL,
    event_date DATE NOT NULL
);

CREATE TABLE attendees_by_dates(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    date_id INT NOT NULL,
    attendee VARCHAR(255) NOT NULL,
    available TINYINT(1) NOT NULL
);


INSERT INTO events (event_name,event_author,event_description)
VALUES
("Youssef's Party ","Youssef","I'm throwing a party to celebrate the end of our class"),
("Richard's Birthday","Arnaud","We prepare a surprise birthday party");


INSERT INTO date_by_events (event_id,event_date)
VALUES
(1,"2022-12-4"),
(1,"2022-12-24"),
(1,"2022-12-30"),
(2,"2022-12-12");

INSERT INTO attendees_by_dates (date_id,attendee,available)
VALUES
(1,"youssef",1),
(1,"richard",0),
(1,"arnaud",1),
(2,"youssef",0),
(2,"arnaud",1);

