# SoftwareDevTeamProject

Brief Application description:
We developed a point-and-click adventure game designed to run within a web browser. This game serves as a demo for a larger project and centers around puzzle-solving mechanics that challenge players to think creatively. Players navigate through static screens, interacting with various objects to transition between rooms, collect items, or use those items to solve intricate puzzles. Each puzzle solved earns the player 1 point, with the game culminating in victory when the player reaches a total of 13 points.
The puzzles vary in complexity, with some requiring specific items from previous pages to complete. These items can either be immediately available or hidden behind other puzzles, creating a layered and interconnected gameplay experience. Certain actions or items on one screen may unlock new possibilities on others, encouraging exploration and strategic thinking.
The ultimate objective is to solve all the puzzles and climb to the top of the leaderboard, which tracks players who complete the game in the shortest time. Progress is saved exclusively for registered users, whose data is securely stored in a database and accessed upon login. This feature ensures a personalized experience and fosters competitive play while preserving the integrity of player achievements.

Contributors:
@onionSoap
@CarterEdwards60
@dorjeezzz
@emsm2434
@zeolhu

Technology Stack used for the project:
PostgreSQL, NodeJS, Handlebars + HTML/CSS/JavaScript

Prerequisites to run the application: Have Docker installed.

Instructions on how to run the application locally:
  1. Clone the repository.
  3. Open Docker.
  4. Run docker compose up in the ProjectSourceCode directory of the project.
  5. Go to http://localhost:3000/.

How to run the tests:
Change the 'command' in the docker.yaml file to 'npm run testandrun'.

Link to the deployed application:
https://softwaredevteamproject.onrender.com/

Directory Information: 
```
SoftwareDevTeamProject
├─ .DS_Store
├─ MilestoneSubmissions
│  ├─ Lab 11 Deliverable Test Plan.docx
│  ├─ Lab 11 Deliverable Test Plan.pdf
│  ├─ Software Dev Lab 9 Deliverable.docx
│  └─ Software Dev Lab 9 Deliverable.txt
├─ ProjectSourceCode
│  ├─ .env
│  ├─ docker-compose.yaml
│  ├─ init_db.sh
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ index.js
│  │  ├─ init_data
│  │  │  ├─ create.sql
│  │  │  └─ insert.sql
│  │  ├─ resources
│  │  │  ├─ css
│  │  │  │  └─ style.css
│  │  │  ├─ game_complete.png
│  │  │  └─ plain_svg
│  │  │     ├─ antlers-svgrepo-com.svg
│  │  │     ├─ butter-svgrepo-com.svg
│  │  │     ├─ carrot-svgrepo-com.svg
│  │  │     ├─ christmas_lights-svgrepo-com.svg
│  │  │     ├─ cookie_cutter-svgrepo-com.svg
│  │  │     ├─ cookies-svgrepo-com.svg
│  │  │     ├─ flour-svgrepo-com.svg
│  │  │     ├─ key-svgrepo-com.svg
│  │  │     ├─ lucky_star-svgrepo-com.svg
│  │  │     ├─ mistletoe-svgrepo-com.svg
│  │  │     ├─ potion-svgrepo-com.svg
│  │  │     ├─ scene1.svg
│  │  │     ├─ scene2_cutting_cookies.svg
│  │  │     ├─ scene2_making_dough.svg
│  │  │     ├─ scene3_part1.svg
│  │  │     ├─ scene3_part2.svg
│  │  │     ├─ scene4.svg
│  │  │     ├─ sugar-svgrepo-com.svg
│  │  │     ├─ svgtestimg_plain.svg
│  │  │     └─ wreath-svgrepo-com.svg
│  │  └─ views
│  │     ├─ layouts
│  │     │  └─ main.hbs
│  │     ├─ pages
│  │     │  ├─ game_complete.hbs
│  │     │  ├─ login.hbs
│  │     │  ├─ login.html
│  │     │  ├─ page1.hbs
│  │     │  ├─ page2.hbs
│  │     │  ├─ page3.hbs
│  │     │  ├─ page4.hbs
│  │     │  ├─ register.hbs
│  │     │  ├─ register.html
│  │     │  └─ scoreboard.hbs
│  │     └─ partials
│  │        ├─ footer.hbs
│  │        ├─ gameview.hbs
│  │        ├─ header.hbs
│  │        ├─ inventory.hbs
│  │        ├─ message.hbs
│  │        └─ svg_components
│  │           ├─ scene1.hbs
│  │           ├─ scene2.hbs
│  │           ├─ scene2_b.hbs
│  │           ├─ scene3.hbs
│  │           ├─ scene3_b.hbs
│  │           ├─ scene4.hbs
│  │           └─ svgsettings.hbs
│  └─ test
│     └─ server.spec.js
├─ README.md
├─ TeamMeetingLogs
│  ├─ meeting1.txt
│  ├─ meeting2_ta.txt
│  ├─ meeting3.txt
│  ├─ meeting4_ta.txt
│  ├─ meeting_5.txt
│  └─ meeting_6TA
└─ relase_notes.txt

```
