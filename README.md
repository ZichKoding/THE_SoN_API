# THE_SoN_API

[Click here for a walkthrough video!](https://youtube.com/)

## Description

THE_SoN_API stands for The Social Network API. With this API you are able to create users, thoughts (posts), reactions to a thought (replies), and a user can have a friend list. The database used is a NoSQL database called MongoDB, and I have used mongoose for all CRUD interactions with MongoDB.
#

## Table of Contents

* [How to create a user](#)
* [How to update a user](#)
* [How to delete a user](#)
* [How to GET all users or one](#)
* [How to add & remove a friend from friend list](#)
* [How to create a thought](#)
* [How to update a thought](#)
* [How to delete a thought](#)
* [How to GET all thoughts or one thought](#)
* [How to add & remove a reaction](#)

#

### **How to create a user**
 To create a user the url is `/api/users/`. Then the body must consist of the following:
 ```
 firstName
 lastName
 username
 email
 password
 ```
The fields above are required, and the username and email have to be unique. There are validators to ensure the username and email is unique and that the email is in email address format. 

The password, also, has validators to ensure a minimum length and has encryption with mongoose-bcrypt package. 
#

### **How to update a user**
To update a user the url is `/api/users/:username`, where `:username` is the unique username of the user needing to be updated.
#
### **How to delete a user**
To delete a user the url is `/api/users/:username`, where `:username` is the unique username of the user needing to be deleted.
#
### **How to GET all users or one**
To get all Users from the database along with their friend list (this list consists of the ids of the users) and thoughts the route is `/api/users`. 

To get one User from the database along with their friend list (this list consists of the ids of the users) and thoughts the route is `/api/users/:username`. 
#
### **How to add & remove a friend from friend list**
For adding and removing a friend from a user's friend list it is the same route, `/api/users/:username/friends/:friendId`, where `:username` is the user's name that wants to add a user to the friend list, and `:friendId` is the user's **_id_** that will be stored into the friend list.
#
### **How to create a thought**
 To create a user the url is `/api/thoughts/`. Then the body must consist of the following:
 ```
 thoughtText
 username
 ```
The fields above are required. The `thoughtText` has a minimum character length of 1 and a maximum character length of 280. The `username` is for a unique user in the User database. 
#
### **How to update a thought**
To update a thought the url is `/api/thoughts/:id` where `:id` is the thought id that is needing to be updated. Also, only the `thoughtText` is allowed to be updated on this route. If you are needing to update a user's username refer to the [How to update a user](#) above.
#
### **How to delete a thought**
To delete a thought the url is `/api/thoughts/:username/:id` where `:username` is the user's username that owns the thought and  `:id` is the thought id that is needing to be deleted. 
#
### **How to GET all thoughts or one thought**
To get all thoughts the url is `/api/thoughts`. This will return all thoughts with the user that owns the thought and a reaction list, which stores the reaction's id to a thought.

To get a single thought the url is `/api/thoughts/:id` where `:id` is the thought's id you are wanting to see. This will return one thought with the user that owns the thought and a reaction list, which stores the reaction's id, text, and reaction's owner to a thought.
#
### **How to add & remove a reaction**
To create a reaction the url is `/api/thoughts/:thoughtId/reactions` where `:thoughtId` is the thought id the reaction will be related to. The reaction's body must consist of the following:
```
reactionBody
username
```
The `reactionBody` stores up to 280 characters and is required. The `username` is the user's username that is adding a reaction to the thought. 

To delete a reaction the url is `/api/thoughts/:thoughtId/reactions/:reactionId` where `:thoughtId` is the thought's id the reaction is related to, and `:reactionId` is the reaction's id that is being deleted. 