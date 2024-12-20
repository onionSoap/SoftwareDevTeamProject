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
    ('carrot', 1),
    ('key', 1),
    ('cookie_cutter', 1),
    ('cookies', 1),
    ('sugar', 1),
    ('butter', 1),
    ('flour', 1),
    ('antlers', 1),
    ('mistletoe', 1),
    ('lucky_star', 1),
    ('potion', 1),
    ('christmas_lights', 1),
    ('wreath', 1);

-- users 1-3 with puzzles 1-3 all unsolved
INSERT INTO users_puzzles (user_id, puzzle_id)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (2,2),
    (2,3);

INSERT INTO items (name)
VALUES
    ('carrot'),
    ('key'), 
    ('potion'),
    ('cookie_cutter'),
    ('cookies'),
    ('flour'),
    ('butter'),
    ('sugar'),
    ('antlers'),
    ('mistletoe'),
    ('christmas_lights'),
    ('lucky_star'),
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


INSERT INTO scene_state (user_id,scene_number, object, visible_state)
VALUES
    (1,'1','antlers','visible'),
    (1,'1','complete_carrot_nose', 'hidden'),
    (1,'1','complete_christmas_lights', 'hidden'),
    (1,'1','complete_wreath', 'hidden'),
    (1,'1','key','hidden'),
    (1,'1','flour','visible'),
    (1,'1','christmas_lights','visible'),
    (1,'2', 'dough_in_bowl', 'hidden'),
    (1,'2', 'carrot', 'visible'),
    (1,'2', 'butter', 'visible'),
    (1,'2', 'sugar', 'visible'),
    (1,'3','lock_open','hidden'),
    (1,'3','lock_closed','visible'),
    (1,'3','cookie_cutter','hidden'),
    (1,'3','mistletoe','hidden'),
    (1,'4','small_tree','visible'),
    (1,'4','lucky_star','visible'),
    (1,'4','complete_christmas_tree','hidden'),
    (1,'4','wreath','visible'),
    (1,'3b','scene3_b','hidden'), --the entire scene b
    (1,'3b','potion_steam','hidden'),
    (1,'3b','potion','hidden'),
    (1,'3b','cookie_cutter','visible'),
    (1,'3b','mistletoe','visible'),
    (1,'2b','scene2_b','hidden'), --the entire scene b
    (1,'2b','cookies','hidden'),
    (1,'2b','cookie_cutouts','hidden'),
    (1,'2b','pan','hidden'),
    (1,'2b','oven_door','visible'),
    (1, '2', 'dough_counter0','visible'),
    (1, '2', 'dough_counter1','hidden'),
    (1, '2', 'dough_counter2','hidden'),
    (1, '3b', 'potion_counter0','visible'),
    (1, '3b', 'potion_counter1','hidden'),
    (1, '3b', 'potion_counter2','hidden'),
    (1, '3b', 'potion_counter3','hidden'),
    (1, '3b', 'potion_counter4','hidden'),
    (2,'1','antlers','visible'),
    (2,'1','complete_carrot_nose', 'hidden'),
    (2,'1','complete_christmas_lights', 'hidden'),
    (2,'1','complete_wreath', 'hidden'),
    (2,'1','key','hidden'),
    (2,'1','flour','visible'),
    (2,'1','christmas_lights','visible'),
    (2,'2', 'dough_in_bowl', 'hidden'),
    (2,'2', 'carrot', 'visible'),
    (2,'2', 'butter', 'visible'),
    (2,'2', 'sugar', 'visible'),
    (2,'3','lock_open','hidden'),
    (2,'3','lock_closed','visible'),
    (2,'3','cookie_cutter','hidden'),
    (2,'3','mistletoe','hidden'),
    (2,'4','small_tree','visible'),
    (2,'4','lucky_star','visible'),
    (2,'4','complete_christmas_tree','hidden'),
    (2,'4','wreath','visible'),
    (2,'3b','scene3_b','hidden'), --the entire scene b
    (2,'3b','potion_steam','hidden'),
    (2,'3b','potion','hidden'),
    (2,'3b','cookie_cutter','visible'),
    (2,'3b','mistletoe','visible'),
    (2,'2b','scene2_b','hidden'), --the entire scene b
    (2,'2b','cookies','hidden'),
    (2,'2b','cookie_cutouts','hidden'),
    (2,'2b','pan','hidden'),
    (2,'2b','oven_door','visible'),
    (2, '2', 'dough_counter0','visible'),
    (2, '2', 'dough_counter1','hidden'),
    (2, '2', 'dough_counter2','hidden'),
    (2, '3b', 'potion_counter0','visible'),
    (2, '3b', 'potion_counter1','hidden'),
    (2, '3b', 'potion_counter2','hidden'),
    (2, '3b', 'potion_counter3','hidden'),
    (2, '3b', 'potion_counter4','hidden');