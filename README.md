# Full Stack Open, part 12 Containers

1. Introduction to Containers

2. Building and configuring environments

3. Basics of Orchestration

## About exercises with command script

The answers are inside the folder script-answers </br>
Each exercise executed with the script command has 3 files:

- exercise12_[exercise_number].txt: contains the output of the script command
- exercise12_[exercise_number]_timing.txt: time file of the output of the script command
- exercise12_[exercise_number]_only_cmd.txt: contains only the executed commands

To show what exactly happened in the terminal on a linetime during each exercise run the following command

```bash
# Exercise 12.3
scriptreplay script-answers/exercise12.3_timing.txt script-answers/exercise12.3.txt -m 0.2
```

To dump the result of the exercise on the screen, execute:

```bash
# Exercise 12.3
scriptreplay script-answers/exercise12.3_timing.txt script-answers/exercise12.3.txt -m 0
```
