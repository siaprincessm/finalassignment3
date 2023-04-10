## Table of Contents
*[Project Name](#project-name)
*[Features](#features)
*[Use Cases](#use-cases)
*[Technologies Used](#technologies-used)
*[Test Case](#test-case)
*[Test Accounts](#testing)

## Project Name
The main purposes of Go gym is to provide a platform for fitness fanatics to connect the experienced, professional fitness coaches to provide workout routines for gym-goers based on the intensity, duration, and level of difficulty. This will help gym-goers to streamline their workout routines based on their priority thru the helpm of trained coaches.

## Features
Privileged user access levels:
    -Coach
    -Gym-goer

Features for Coach user:
    -Search routines
    -Add, Edit, Delete routine
    -Create user

Features for Gym-goer
    -Search routines
    -Add comment to routine

## Use Cases
    Log in
        Objective - successfuly log in to respective accounts.
        Steps:
            1. Input log in credential
            2. Click log in

    Search Routine
        Objective - show a list of workout
        Steps:
            1. Fill in the boxes your preference when working out.
            2. Fill in Main goal; loose fat, build muscle.
            3. Fill in Workout type; single muscle group, full body, cardio.
            4. Intensity; beginner, intermediate, advanced.
            5. Duration in minutes; Input number.

    Search Routine - Reset Button
            Objective - Coach to create/add a routine.
            Steps:
                1. Click create routine.
                2. Fill in Main goal, Workout type, Equipments, Intensity and Duration in minutes
                3. Click reset button

    Create a routine  
            Objective: Create a routine
            Steps:
                1. Click create routine.
                2. Fill in Main goal, Workout type, Equipments, Intensity and Duration in minutes
                3. Click create

    Create Routine - Remove button
            Objective: Remove the input routine.
            Steps: 
                1. Fill in the name of exercise.
                2. Fill in the sets required.
                3. Fill in the repetitions required.
                4. Click remove. 

    Create Routine - Add button.
            Objective: Add new routine.
            Steps: 
                1. Fill in the name of exercise.
                2. Fill in the sets required.
                3. Fill in the repetitions required.
                4. Click add. 

    Create User 
            Objective: Register a user
            Steps:
                1. Fill in nickname.
                2. Input username.
                3. Input password.
                4. Input type of user.
                5. Click create.

    Sign out
            Objective: Log out from system
            Steps: 
                1. Click user.
                2. Click sign out.




## Technologies Used
    Languages 
        JavaScript (JS) - both for back-end and front-end	
        HTML - front-end
    Framework 
        Vue - JS Framework for building Single Page Applications (SPAs).
        NodeJS - JS runtime framework used for building back-end services with JS.
        Express - JS web app framework used to build RESTful APIs with NodeJS.
    Libraries
        Bootstrap - HTML/CSS/JS framework for building the user interface (UI) with ready-made css templates.
    Tools
        VS Code - used as an IDE
        Git - user for source control


## Test Case
| Test Case # | Description | Steps | Expected Results
| --- | --- | --- | --- |
| `Log in` | User to input his login credentials | 1. Fill in username 2. Fill in password 3. Click log in | Successful log in |
| `Coach and Gym-goer search for a routine` | Search workout routine | 1. Click hamburger button 2. Click Routines 3. Choose between Main goal, Workout type, Intensity and Duration in Minutes whichever your priority 4.Click Search | Successful login |                                             
|`Reset Button`| Delete the your search input | 1. Filling in your searches 2. Click Reset | Delete the searches |
|`Coach to Create a routine`| Create a routine | 1. Click hamburger button 2.Click Create Routine 3. Fill in the details 4. Click Create | Delete the searches |
|`Create Routine - Remove button`| Removes your exercise inputs | 1. Fill in Name of exercise and, sets required, repetitions required. 2. Click remove | Delete the searches |
|`Create Routine - Add button`| Add additional exercise | 1. Fill in Name of exercise, sets and repetitions 2. Click add | Delete the searches |
|`Create Routine - Create button`| Save the exercises you added to a routine | 1. Fill in the Main goal, workout type, equipment needed, intensity and Duration in minutes. 2. Fill in the exercises 3. Click Create  button | Register the whole routine to the system |
|`Create user`| Only coaches are allowed to access Create User to make sure all routines are safe |1. Click the hamburger button 2. Click Create User 3. Fill the necessary details 4. Click Create | Register the whole routine to the system |
|`Sign out`| User to Logout |1. Click hamburger button 2. Click User/Nickname 3. Click Sign out | Sign out from your account |
=======
| `Log in` | User to input his login credentials | 1. Fill in username 
                                                   2. Fill in password 
                                                   3. Click log in |Successful log in

## Test Account
    *Coach
        Email: ps@gmail.com
        Password: 321cba

    *Gym-goer
        Email: nick@gmail.com
        Password: nickgymgoer
