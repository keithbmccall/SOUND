
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(20) UNIQUE,
  password_digest VARCHAR NOT NULL
);

DROP TABLE IF EXISTS sounds;

CREATE TABLE sounds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  artist VARCHAR(255),
  album VARCHAR(255),
  image VARCHAR(2000),
  preview VARCHAR(2000),
  genre VARCHAR(255),
  itunes_track_id VARCHAR(255),
  user_id INTEGER,
  comments VARCHAR(255)
);

DROP TABLE IF EXISTS users_sounds;

CREATE TABLE users_sounds (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  sounds_id INTEGER REFERENCES sounds
);