# Project Two: Life in the Front End
## Objectives

1. Build confidence as a developer by building something of your own.
2. Manage yourself (your time and your emotions) when given a large amount of unstructured work.
3.  Gain experience building a complex client-side application that consumes an API.
4.  Document your work and share it with the public in an effective and articulate manner.
5. Learn new technologies by reading documentation and experimenting.

## Dates

* *Start* - Morning of Friday, May 1.
* *End* - 9:00AM on Tuesday, May 6.

On the morning of the 6th, we will each present a  7 minute lightning talk to our classmates the progress we have made.

## Process

We do not want to jump immediately into coding. We want to carefully plan our apporach.

1. Create a Trello board with `Backlog`, `Doing`, and `Done` lists.
2. Enter user stories into the `Backlog` list.
3. Iterative Development
  * Move one story at a time into the `Doing` list. Once it's done, move it to `Done` and start your next story.
  * **DO NOT** try to work on more than one or two stories at once.


## Spec

As always, please create a simple feature spec for this app.

Format is as follows:

> 1. A user can....

## Deliverables
* Public repo on Github with your project code
* `README.md` (in the root folder of your project) that includes:
  * The project's name and description,
  * Your feature spec
  * APIs or modules used and descriptions of each
  * Instructions for downloading the code and running it on localhost
  * Link to the live url of your hosted project...
* A deployed application on a Digital Ocean droplet
* A 7-minute lightning talk to discuss the below 3 topics
  * What did you do?
  * What was the biggest thing you learned?
  * What was the hardest part of the project?

## Instructors

As this project is mostly self-driven we expect you to spend a lot of time debugging errors and problem solving on your own. That said, we want to schedule 1:1 with each of you to review your progress and give feedback.

Each student will be able to sign up for a 15 minute one on one session with an instructor. Please [sign up for a slot](https://docs.google.com/a/generalassemb.ly/spreadsheets/d/1xi54XpBlgn0SxmwyHtiPHWvcCXZMnDXdV7SMGMLmWAU/edit?usp=sharing).

Please keep in mind that we will not be able to maintain a help queue a la Gretchen or Dave, so if you grab us outside of your scheduled time please understand if we are not able to answer your questions.

## Keep in Mind

**You are going to encounter a ton of unexpected errors and problems.**

Expect to come up against a lot of what can *seem* like roadblocks. Resist the urge to get frustrated. These are amazing learning opportunities. A lot of students treat errors during projects as just getting in the way of "finishing". The point of this project is **not** to finish all of the user stories; the point is to integrate your knowledge and deepen your understanding of how to put apps together.

Errors often provide the most valuable source of information about what we don't yet understand. Seeing an error as "it's not working" and randomly changing stuff until "it works" won't teach you anything. Spending time thoughtfully debugging issues is a fantastic investment that will lead to greater mastery and understanding.

**Pro-Tip** - 'Failure is a temporary state.'

## Problem:

A horrible disease outbreak has overtaken much of the world and turned ordinary people into zombies.  As the zombie population grows, they have found that they have nowhere to eat.  Your friend Rick sees an amazing business opportunity to feed all of these zombies and creates a diner called "The Walking Fed".  Rick needs to get the word out, so he asks you create a web application to host his menu (they're undead, but it's also the 21st century).

## Requirements:
- When Rick visits the site, he should see a list of dishes that are served at the diner, as well as an image associated with that dish and the price.
- Rick can update the price, image, and name of the dish using the site.
- Rick can remove dishes that aren't popular at the diner
- Rick can add new dishes when new supplies come in
- Rick has many hungry customers who have no patience and they'll go after him if he's spending his time waiting for page reloads.
- Rick would like it to look appealing, with good design principles, fonts, colors, etc.  The zombies may be ugly, but they like to be visually impressed.

Rick has provided an API.  He's got some server experience, but he's pretty bad at front-end (which is why he has hired you).

### Not Required:
- Backbone
	- You can choose to implement Backbone or use Vanilla JS (or jQuery) to implement your site
- jQuery
	- You can use jQuery or Vanilla JS
- Bootstrap

# Bonuses:
- Rick sometimes enters incorrect data in the create and update form.  He would like you to prevent him from entering incorrect data on the forms.  He did a Google search and found the [validate](http://backbonejs.org/#Model-validate) method on Backbone models.  He also found [this library](https://github.com/thedersen/backbone.validation).  
In particular, you should ensure the following: 
   - The name should be required
   - The name should not be empty (i.e. "")
   - The price should be a number
   - The price should be greater than or equal to $1.
   - The price should be required
- Rick added a categories table.  It's not super important, but he'd like to be able to show the dishes for each category. 
- While you're at it, he'd also like to be able to 
	- create categories
	- add dishes to those categories
	- remove dishes from those categories
	- update the name of the category
	- remove the category
- Use [Draggabilly](http://draggabilly.desandro.com/) or [jQuery UI](https://jqueryui.com/draggable/) to drag dishes between categories
- Try adding some "pop" to the site with [animate.css](http://daneden.github.io/animate.css/).
- Rick is often on the run (from Zombies).  Make the site responsive for mobile devices so he can update his restaurant while on the go.

# Tips:
- If you are unsure about Backbone, start off without it.  You can always go in and add it later once you have something working.
- Backbone is **MODULAR**, so you can use just models/collections or just views, or just routers, or any combination of them.  You can choose to play to your strengths or increase your skills in a weak area.
- You should not need to change the server at all in order to do this, but you do have access to the code and can choose to add things, should you see fit.
- If you choose to use Bootstrap, you should also check out [Semantic UI](http://semantic-ui.com/) or [Skeleton](http://getskeleton.com/)

