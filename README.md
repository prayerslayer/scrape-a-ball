# scrape-a-ball

Scrapes basketball-reference.com all the time, extracts information to a database, provides REST API.

# TODO

1. Look at structure of pages:
  * Leagues (NBA, ABA at least)
  * Schedule
  * Standings (Division & Conference)
  * Box Scores
  * Draft
  * Coaches
  * Awards
2. Develop database architecture for this structure
3. Determine which pages actually have to be scraped and which information may be calculated from those. This is to avoid possible inconsistencies.
4. Start coding

# Stuff to think about

* Really necessary to fetch only players, teams and box scores and calculate from there? Disadvantages: Write-heavy, complicated (think of Opponents DefRtg per Season or individual advanced career stats). Advantages: Feels right. Possible alternatives: Don't use relational DB and instead document store like Mongo. Just dump the extracted information.
* How to model awards? There are individual awards once per season (COTY, ROTY, MIP, Season MVP, Finals MVP) or multiple times (Player of the week/month), sometimes per conference (potw east/west). Should championships count as awards?

# Structure of BBall-Ref

Which sites to scrape for what information? Note that everything is inside ``"div#page_content"``.

Variables, denoted with {CURLYBRACES_CAPSLOCK}:
* **3LETTERABBREV**: three letter abbrevation of the team, e.g. CHI for Chicago Bulls.
* **YEAR**: you know that...

## Players

* All players: ``/players/[a-z]``
* Single player: ``"tr[data-row] a:first"`` on players page

### General information

Everything is inside ``"div#info_box"``.

* Image: ``"div.person_image > img"``
* Name: ``"div.person_image_offset > h1"``
* Birth: ``"div.person_image_offset > p > span#necro-birth[data-birth]"``
* Numbers: ``"div.person_image_offset > div.uni_holder a > span[tip]"`` for team and years and ``textContent`` for actual number.

Everything else weirdly intertwined in ``"div.person_image_offset > p"``. That is:

* Position
* Shooting hand
* Height
* Weight
* Birthplace
* High school
* College
* Draft information

### Statistics

* Totals: ``"div.stw#all_totals tr[data-row] > td"``
* Per Game: ``"div.stw#all_per_game tr[data-row] > td"``
* Per Minute: ``"div.stw#all_per_minute tr[data-row] > td"``
* Advanced: ``"div.stw#all_advanced tr[data-row] > td"``
* Playoffs: ``"div.stw#all_playoffs_totals tr[data-row] > td"``
* Playoffs Per Game: ``"div.stw#all_playoffs_per_game tr[data-row] > td"``
* Playoffs Per Minute: ``"div.stw#all_playoffs_per_minute tr[data-row] > td"``
* Playoffs Advanced: ``"div.stw#all_playoffs_advanced tr[data-row] > td"``
* College: ``"div.stw#all_college tr[data-row] > td"``

TODO: Check how columns differ among those tables.

### Misc

* Similarity Scores: ``"div#all_sim_scores > div#div_sim_career tr[data-row] > td"``
* Awards: ``"div#all_leaderboards_other > table#leaderboard tr > td > div > div > span" textContent`` gives type of award (All-Star Games, Awards, Championships, Minutes Played…). From there it's a bunch of links followed by text followed by breakline.
* Transactions: ``"div.stw#all_transactions > div#transactions > p > span.bold_text"`` contains the date, afterwards is a description of the transaction.
* Salaries: ``"div.stw#all_salaries > div#div_salaries > table#salaries tr[data-row] > td"``

## Teams

* Active teams: ``"table#active tr[data-row] > td:first"`` if it's a link, then there is a team site to it.
* Defunct teams: Same with ``table#defuct``.

Or directly at ``/teams/{3LETTERABBREV}/``.

### General Information

Sort of accessible inside ``"div#info_box > div.stw > div > p"``. Available information:

* Location
* Team names
* Seasons
* Record
* Playoff appearances
* Championships

### Seasons

``"div#page_content > div#div_{3LETTERABBREV} > table#div_{3LETTERABBREV} tr[data-row] > td"``

### Single Season

Reachable at ``/teams/{3LETTERABBREV}/{YEAR}.html``.

#### General Information

Extract everything from ``"div#info_box > p"``. That includes:

* Record
* Coach
* Points per game
* Opponents points per game
* Simple Rating System
* Pace
* Offensive/Devensive Rating
* Expected W-L
* Arena
* Attendance
* Playoffs

#### Team Info

* Roster: ``"div.stw#all_roster > div#div_roster > table#roster tr[data-row] > td"``.
* Team and Opponent stats: ``"div.stw#all_team_stats > div#div_team_stats > table#team_stats tr > td"``
* Team and Opponent misc: ``"div.stw#all_team_misc > div#div_team_misc > table#team_misc tr > td"``

#### Statistics

Same as on player page.

#### Misc

* Salaries: See player page.

