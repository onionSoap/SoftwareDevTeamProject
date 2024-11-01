CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    timer TIME DEFAULT '00:00:00',
    progress TINYINT DEFAULT '0'
);

CREATE TABLE puzzles (
    puzzle_id SERIAL NOT NULL PRIMARY KEY,
    value TINYINT NOT NULL
);

CREATE TABLE users_puzzles (
    user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    puzzle_id FOREIGN KEY (puzzle_id) REFERENCES puzzles(puzzle_id),
    is_solved BOOL DEFAULT '0',
    PRIMARY KEY (user_id, puzzle_id)
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    status VARCHAR(10) CHECK(status IN('unknown','found','active','disabled'))
);