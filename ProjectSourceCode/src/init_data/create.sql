-- need to make PostgresSQL not mySQL
DROP TABLE IF EXISTS users_puzzles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS puzzles;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users_items;
DROP TABLE IF EXISTS scenes;
DROP TABLE IF EXISTS scene_state;
-- need to make PostgresSQL not mySQL
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,
    timer TIME DEFAULT '00:00:00',
    progress INT DEFAULT '0'
);
-- removing these puzzle tables and changing the game to be "item status based" vs "puzzle status based" maybe...
CREATE TABLE puzzles (
    puzzle_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    value INT NOT NULL
);

CREATE TABLE users_puzzles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    puzzle_id INT REFERENCES puzzles(puzzle_id) ON DELETE CASCADE,
    is_solved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, puzzle_id)
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE users_items (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    item_id INT REFERENCES items(item_id) ON DELETE CASCADE,
    status VARCHAR(10) CHECK(status IN('unknown','found','active','disabled')) DEFAULT 'unknown',
    PRIMARY KEY (user_id, item_id)
);

CREATE TABLE scenes (
    scene_id VARCHAR(2) PRIMARY KEY
);

CREATE TABLE scene_state (
    scene_state_id SERIAL PRIMARY KEY,
    scene_number VARCHAR(2) REFERENCES scenes(scene_id) ON DELETE CASCADE,
    object VARCHAR(30) NOT NULL,
    visible_state VARCHAR(7) CHECK(visible_state IN('visible','hidden'))
);