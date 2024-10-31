-- INSERT INTO table_name (column1, column2, column3, ...)
-- VALUES (value1, value2, value3, ...);

-- 1-3 users with username and passwords, default timer and progress
INSERT INTO users (username, password)
VALUES (
    ('test', '123'),
    ('admin', 'admin')
    ('beep', 'boop')
);

-- puzzles 1-4 all valued at 25
INSERT INTO puzzles (value)
VALUES (
    (25),
    (25),
    (25),
    (25)
);

-- users 1-3 with puzzles 1-4 all unsolved
INSERT INTO users_puzzles (user_id, puzzle_id)
VALUES (
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (2,1),
    (2,2),
    (2,3),
    (2,4),
    (3,1),
    (3,2),
    (3,3),
    (3,4)
);

-- items 1-4 all unknown
INSERT INTO items (status)
VALUES (
    ('unknown'),
    ('unknown'),
    ('unknown'),
    ('unknown')
);