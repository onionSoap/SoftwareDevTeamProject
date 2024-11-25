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
    ('Open_the_present',33),
    ('wreath',1),
    ('carrot',1),
    ('christmas_lights',1);

-- users 1-3 with puzzles 1-3 all unsolved
INSERT INTO users_puzzles (user_id, puzzle_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (2,2),
    (2,3);

-- update this to inventory order
INSERT INTO items (name)
VALUES
    ('carrot'),
    ('key'), 
    ('potion'),
    ('cookie_cutter'),
    ('cooked_gingerbread_men'),
    ('flour'),
    ('butter'),
    ('sugar'),
    ('antlers'),
    ('mistletoe'),
    ('christmas_lights'),
    ('star'),
    ('wreath');

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
    (1,12),
    (1,13),
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
    (2,11),
    (2,12),
    (2,13);

INSERT INTO scenes (scene_id)
VALUES
    ('1'),
    ('2'),
    ('2b'),
    ('3'),
    ('3b'),
    ('4');


INSERT INTO scene_state (scene_number, object, visible_state)
VALUES
    ('1','antlers','visible'),
    ('1','complete_carrot_nose', 'hidden'),
    ('1','complete_christmas_lights', 'hidden'),
    ('1','complete_wreath', 'hidden'),
    ('1','key','hidden'),
    ('1','flour','visible'),
    ('1','christmas_lights','visible'),
    ('2', 'dough_in_bowl', 'hidden'),
    ('2', 'carrot', 'visible'),
    ('2', 'butter', 'visible'),
    ('2', 'sugar', 'visible'),
    ('3','lock_open','hidden'),
    ('3','lock_closed','visible'),
    ('3','cookie_cutter','visible'),
    ('3','mistletoe','visible'),
    ('4','small_tree','visible'),
    ('4','lucky_star','visible'),
    ('4','complete_christmas_tree','hidden'),
    ('4','wreath','visible'),
    ('3b','potion_steam','hidden'),
    ('3b','potion','hidden'),
    ('3b','cookie_cutter','visible'),
    ('3b','mistletoe','visible'),
    ('2b','cookie_cutout_1','hidden'),
    ('2b','cookie_cutout_2','hidden'),
    ('2b','cookie_cutout_3','hidden'),
    ('2b','cookie_cutout_4','hidden'),
    ('2b','cookie_in_pan_1','hidden'),
    ('2b','cookie_in_pan_2','hidden'),
    ('2b','cookie_in_pan_3','hidden'),
    ('2b','cookie_in_pan_4','hidden'),
    ('2b','pan','hidden'),
    ('2b','oven_door','visible');
