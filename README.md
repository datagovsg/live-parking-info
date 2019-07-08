# Understanding Web Development

This repository is course content for the [Understanding Web Development Course](https://www.cscollege.gov.sg/programmes/pages/display%20programme.aspx?epid=88mh6oplhphm3pdmkhkcpp5smo) created and run by the [Open Government Products](open.gov.sg) team. 

If you have any feedback to provide, or are interested in collaborating, [reach out](https://open.gov.sg/contact-us/). We're actively looking for ways to make this course sustainable and eventually scalable.

## Folder structure

- student [start here]: The starting folder for students
- presentation: The presentation used during the course 
  - image-recognition: OpenCV demo using Python
  - final-product: What you'll have at the end of the course

## Participant pre-requisites
Have the following installed before starting the course:
- Visual Studio Code
    - Set a theme of your choice
    - Toggle word wrap
- A modern web browser such as Chrome, Firefox, Safari
    - Have a JSON Formatter/parser extension installed
- This repository (click on the green download button on the top right hand corner)

### API Design

This repository also contains the API that participants use during the course. We designed it based on feedback from participants across successive runs. We found that the API section was quite tough and we would lose a lot of participant interest during that section. 

One of the goals of the course was to let participants walk away with a website that they created by the end of the course. This strong sense of empowerment, we believe, would spur them on to find out more about web development beyond the course. In order to find out the nearest carpark to you, you'd need to use OneMap's API to find out the X and Y coordinates of your current location, data.gov.sg's API to find out an exhaustive list of all carparks in Singapore, search through that whole list to find which is closest. That was a lot of logic that participants would have to reason about.

We have now abstracted both APIs and implementation logic away from the participants and presented them with only one simple API call, similar to the [Chuck Norris Joke API](https://api.chucknorris.io/) that is used in other web introductory courses. The code for the API can be viewed in `index.js` file and the API design can be seen in the swagger.yml file.

We have deployed the `index.js` file on AWS Lambda, a functions as a service or serverless cloud solution. Before deploying, make sure to run `zip -r lambda.zip node_modules/ index.js hdb-carpark-information.csv` to create the zip file for uploading. In order to make the lambda function accessible to the world, we set up HTTP proxy on AWS API Gateway so that participants can access it easily.

Documentation for the API is available in `swagger.yml` file. To make edits and see it displayed locally, make sure to run `http-server`.

## Attribution

This course is distributed under the MIT license. While you are free to use it and create derivative works as you see fit, 
we would love to be duly attributed. This could be done by flashing a slide at the workshop that describes who we are, accompanied with a short verbal statement crediting us as the original authors.

## Get in touch

If you are interested in working with us to improve digital literacy in government and the nation, 
we would love to hear from you! Reach us at https://open.gov.sg/contact-us/
