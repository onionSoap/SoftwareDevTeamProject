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
-- update with Sofia's puzzles
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

-- items 1 set to unknown
-- update with all items Sofia sent one adding ONE item works :(
-- ["carrot","key","cookie_cutter","flour","sugar","butter","antlers","mistletoe","lucky_star","christmas_lights","wreath"];
INSERT INTO items (name)
VALUES
    ('key'), --don't forget to change this to , instead of ;
    ('carrot'),
    ('cookie_cutter'),
    ('flour'),
    ('sugar'),
    ('butter'),
    ('antlers'),
    ('mistletoe'),
    ('lucky_star'),
    ('christmas_lights'),
    ('wreath');

-- CREATE TABLE users_items (
--     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
--     item_id INT REFERENCES puzzles(puzzle_id) ON DELETE CASCADE,
--     status VARCHAR(10) CHECK(status IN('unknown','found','active','disabled')) DEFAULT 'unknown',
--     PRIMARY KEY (user_id, item_id)
-- );
--only one item rn, two users populated by default
INSERT INTO users_items (user_id, item_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (1,6),
    (1,7),
    (1,8),
    (1,9),
    (1,10),
    (1,11),
    (2,1),
    (2,2),
    (2,3),
    (2,4),
    (2,5),
    (2,6),
    (2,7),
    (2,8),
    (2,9),
    (2,10),
    (2,11);