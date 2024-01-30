---
title: Building a Wordle Clone - A Developer's Journey
date: "2023-05-20"
description: My journey creating wordle clone terminal app
tags:
  - python
  - terminal
  - web dev
---

For a while now, I've been entranced by the game Wordle. As a junior developer studying at Coder Academy, I decided to build my own Wordle clone using Python for my assignment. With the assignment offering an excellent opportunity to put the skills I have learnt to test, I embarked on my development journey. The process was spread across several days, with each day dedicated to building different features.

## Day 1: Planning and Initialization

The project started with planning. I laid down the foundation for the project and prepared for the journey ahead. I mapped out a features plan and made sure that I had all the necessary libraries and tools. The entire development process can be viewed in a [Trello board](https://trello.com/b/QJX1M5UE/t1a3-implementation-plan).

## Day 2-4: Implementing Core Features

Over these days, I implemented the Minimum Viable Product (MVP) features. This included generating a random 5-letter word, taking and analysing user input, incorporating a main play loop, highlighting letters based on analysis, exporting the record as a txt file, adding "play again" and "give up" commands, and lastly, checking the spelling of the guess.

I extensively used the pytest and random libraries, and ensured each piece of code was tested before being integrated. I used external packages to check the validity of words and used colouring packages for visually appealing feedback. File handling was revisited for record exports, and loops and error handling mechanisms were set up for the gameplay commands.

## Day 5: Reviewing and Refactoring Code

After completing the core features, I reviewed the code, refactored where necessary, and optimised it to ensure smooth functioning. I also revised test cases and ran them again to verify the changes.

## Day 6-7: Implementing Bonus Features

With the basic game established, I implemented bonus features. I added a user profile and customisation options. I created a player class to handle player data and implemented automatic saving in the play loop. I added various player settings like different word lists, a function to customise number of chances, and a feature to rename the player.

![App flow](@images/blog-img/terminal-1-app-flow.png)

## Day 8-9: Wrapping Up and Documentation

The project was wrapped up with final tweaks and polishing. Documentation was written to ensure the code was understandable and maintainable by others. Lastly, I created functions to export all or individual game records, revising the code to ensure it adheres to the DRY (Don't Repeat Yourself) principle.

## Day 10-11: Contingency

Contingency days were kept for dealing with any unexpected problems. Any last-minute issues were solved and final touches added.

## Day 12: Final Review and Submission

With all features implemented, tested, and reviewed, the final product was ready for submission. The Python-based Wordle clone was complete!

Reflecting on the process, I believe it was a great experience that honed my skills and taught me how to work systematically on a project, implementing and testing features one by one.
