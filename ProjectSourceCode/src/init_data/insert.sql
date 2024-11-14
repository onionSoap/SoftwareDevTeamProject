-- INSERT INTO table_name (column1, column2, column3, ...)
-- VALUES (value1, value2, value3, ...);

-- 1-3 users with username and passwords, default timer and progress
INSERT INTO users (username, password)
VALUES
    -- username: admin, password: admin
    ('admin','$2a$10$UjNEiZ7DKCr4iTt3.yRD3uAswujYyjRdzi8UsCI4S1UAbVldSPCWu'),
    -- username: beep, password: boop
    ('beep','$2a$10$n4si2D1TNuaFohFTsxx/A.HAlDRag2cs6fkwmU2XdYiAYLGmmXTOi');

-- puzzles 1-3, values at 33,33, and 34 (total 100)
INSERT INTO puzzles (name, value)
VALUES
    ('Lock_and_key',34),
    ('Light_up_tree',33),
    ('Open_the_present',33);

-- users 1-3 with puzzles 1-3 all unsolved
INSERT INTO users_puzzles (user_id, puzzle_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (2,2),
    (2,3);
    -- (3,1),
    -- (3,2),
    -- (3,3);

-- items 1 set to unknown
INSERT INTO items (name,status)
VALUES
    ('key','unknown');