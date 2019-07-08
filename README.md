# Understanding Web Development

This repository is course content for the [Understanding Web Development Course](https://www.cscollege.gov.sg/programmes/pages/display%20programme.aspx?epid=88mh6oplhphm3pdmkhkcpp5smo) created and run by the [Open Government Products](open.gov.sg) team. 

If you have any feedback to provide, or are interested in collaborating, [reach out](https://open.gov.sg/contact-us/). We're actively looking for ways to make this course sustainable and scalable.

## Folder structure

- student [start here]: The starting folder for students
- presentation: The presentation used during the course 
  - image-recognition: OpenCV demo using Python
  - final-product: What you'll have at the end of the course
- dist: Swagger API documentation files that can be viewed on https://opengovsg.github.io/live-parking-info

## Participant pre-requisites
Have the following installed before starting the course:
- Visual Studio Code
    - Set a theme of your choice
    - Toggle word wrap
- A modern web browser such as Chrome, Firefox, Safari
    - Have a JSON Formatter/parser extension installed
- This repository (click on the green "Clone or Download" button on the top right hand corner)

## Nearest Carpark available API

In addition to course content, this repository contains the API that participants use during the course (documentation [here](https://opengovsg.github.io/live-parking-info/)). 

One of the goals of the course was to let participants walk away with a website that they created by the end of the course. This strong sense of empowerment, we believe, would spur them on to find out more about web development beyond the course. However, we realized across multiple runs that our API section would be quite tough for participants and leave them confused instead of enlightened. In order to find out the nearest carpark to you, you'd need to get the X and Y coordinates of your location from OneMap's API and an exhasutive list of carparks and availability from Data.gov.sg's API to calculate which carpark is closest to you.

We have now abstracted both API calls and implementation logic away from the participants and presented them with one simple API call, similar to the [Chuck Norris Joke API](https://api.chucknorris.io/) that is used in other web introductory courses. The code for the API can be viewed in `index.js` file and the API documentation can be edited in the `swagger.yml` file.

For participant consumption, we have deployed the `index.js` file on AWS Lambda, a functions as a service or serverless cloud solution (Note: run `zip -r lambda.zip node_modules/ index.js hdb-carpark-information.csv` to create the zip file for uploading). In order to make the lambda function accessible to the world, we set up AWS API Gateway so that participants can use HTTP GET method to interact with the function.

## Attribution

This course is distributed under the MIT license. While you are free to use it and create derivative works as you see fit, 
we would love to be duly attributed. This could be done by flashing a slide at the workshop that describes who we are, accompanied with a short verbal statement crediting us as the original authors.

## Get in touch

If you are interested in working with us to improve digital literacy in government and the nation, 
we would love to hear from you! Reach us at https://open.gov.sg/contact-us/
