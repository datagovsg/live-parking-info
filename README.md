# Understanding Web Development
This repository is course content for the [Understanding Web Development Course](https://www.cscollege.gov.sg/programmes/pages/display%20programme.aspx?epid=88mh6oplhphm3pdmkhkcpp5smo) created and run by the [Open Government Products](open.gov.sg) team. 

If you have any feedback to provide, or are interested in collaborating, [reach out](https://open.gov.sg/contact-us/). We're actively looking for ways to make this course sustainable and scalable.

## Participant Information

### Folder structure

- student [start here]: The starting folder for students
- presentation: The presentation used during the course 
  - image-recognition: OpenCV demo using Python
  - final-product: What you'll have at the end of the course
- dist: Swagger API documentation files that can be viewed on https://opengovsg.github.io/live-parking-info

### Pre-requisites
Have the following installed before starting the course:
- Visual Studio Code
    - Set a theme of your choice
    - Toggle word wrap
- A modern web browser such as Chrome, Firefox, Safari
    - Have a JSON Formatter/parser extension installed
- This repository (click on the green "Clone or Download" button on the top right hand corner)

### Suggested pre-learning
- What is HTML? https://prototype.guide/class/lessons/basics101/
- What is CSS? https://prototype.guide/class/lessons/basics102/
- What is Javascript? https://prototype.guide/class/lessons/js101/

## Instructor information

### General tips for presenters

- It is common behaviour for participants to start typing and copying whatever the instructor starts typing on screen. In doing so, they end up not listening. Be explicit with participants when they should simply listen and when they need to type along / copy.
- Don't forget that you are teaching something very foreign to them. Be patient and mindful of it.
- Repeat things twice
- Explain even the simplest of things, like == and the difference between ) and }
- Toggle between the final product and the current product so that they know how what you're building is contributing to the final product
- Make sure you highlight the code changes you have made
- Don't answer questions about technical stuff with more jargon than before
- encourage copy pasting so that they don't make tiny mistakes with spelling and stuff
- it's good to start slow. It helps people understand and not get lost too early, which can lead to disengagement
- practice at least twice, preferably with a real audience, before you actually teach. It'll help you remove any jargon that you still invariably use


### General tips for trainers
- Avoid comandeering the participants keyboard. Guide them through what they need to do by pointing and speaking through the steps.
- When the participant complains about something, open up the console. The error message may be cryptic, but the line that the error is on isn't. Look at that line, followed by the line before it, to find the error
- common errors include:
  - mistaken casing (getElementByID instead of getElementById)
  - mistaken spelling (background-colour instead of background-color)
  - mistaken characters (using round brackets instead of curly brackets)
  - missing closing brackets
  - missing closing quotation marks
    

### General tips for running the course
- Have trainers dedicated to each table. They build rapport with the students. Provide time for them to do introductions in the beginning so that they feel comfortable enough asking questions to each other.
- Create table islands so that people get to know each other on that table.

### API Design and Implementation

In addition to course content, this repository contains the API that participants use during the course (documentation [here](https://opengovsg.github.io/live-parking-info/)). 

One of the goals of the course was to let participants walk away with a website that they created by the end of the course. This strong sense of empowerment, we believe, would spur them on to find out more about web development beyond the course. However, we realized across multiple runs that our API section would be quite tough for participants and leave them confused instead of enlightened. In order to find out the nearest carpark to you, you'd need to get the X and Y coordinates of your location from OneMap's API and an exhasutive list of carparks and availability from Data.gov.sg's API to calculate which carpark is closest to you.

We have now abstracted both API calls and implementation logic away from the participants and presented them with one simple API call, similar to the [Chuck Norris Joke API](https://api.chucknorris.io/) that is used in other web introductory courses. The code for the API can be viewed in `index.js` file and the API documentation can be edited in the `swagger.yml` file.

For participant and public consumption, we have deployed the `index.js` file on AWS Lambda, a functions as a service or serverless cloud solution (Note: run `zip -r lambda.zip node_modules/ index.js hdb-carpark-information.csv` to create the zip file for uploading). In order to make the lambda function accessible to the world, we set up AWS API Gateway so that participants can use HTTP GET method to interact with the function.

### Lesson breakdown

Introduction:
- Slides 1-11
- Natural stopping points: 10
- Estimated time required: 15mins

Client/server model, HTML
- Slides 12-28
- Natural stopping points: 21, 23, 25, 28
- Estimated time required: 20mins

JS 
- Slides 29-45
- Natural stopping points: 34, 39, 45
- Estimated time required: 25 mins

APIs 
- Slides 46-64
- Natural stopping points: 59, 60, 61, 63, 64
- Estimated time required: 40 mins

CSS 
- Slides 66-72
- Natural stopping points: 67, 68, 69, 70, 71
- Estimated time required: 20 mins

Deployment 
- Slides 73-76
- Natural stopping point: 76
- Estimated time required: 10 mins

Total estimated time for the course: 2 hours, 10 mins

## Next steps 

## Attribution

This course is distributed under the MIT license. While you are free to use it and create derivative works as you see fit, 
we would love to be duly attributed. This could be done by flashing a slide at the workshop that describes who we are, accompanied with a short verbal statement crediting us as the original authors.

## Get in touch

If you are interested in working with us to improve digital literacy in government and the nation, 
we would love to hear from you! Reach us at https://open.gov.sg/contact-us/
