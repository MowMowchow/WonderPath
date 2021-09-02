# WonderPath

### **NOTE: Path generation is down as my google cloud subscription has ended and I do not have the money to renew it ;-;

WonderPath is a unique and easy to use path generation service. @ https://wonderpath.herokuapp.com/#/

~ Info ~

- The path generation script was done using Python.
- I created a (Python) Flask REST API server to handle requests from the frontend
- User Authentication handled with Firebase, and MongoDB was used to store the saved paths
- The rest of the site/user interface was built using React

The idea for the project came out of my love for running and the boredom that spawned from running the same 5km and 8km loops 3 times a week for over 4 years. 

Users may enter their current location and the desired distance to receive a route for walking, biking, or any other activities. An example is provided below. 

![WonderPath Route Example](https://i.imgur.com/2W0v4yk.jpg)

The path generation can be broken into three steps:
1) Obtaining the user's current location (which is then converted into a longitude & latitude pair).
2) Using a rearrangement of the Haversine formula to find a corresponding pair of points such that the distance between the pair entered and the new pair is the desired distance.
3) Using the Google Maps API to find directions between the two points.

~ Notes ~
- I could not find an equation online to perform step 2 (described above) and thus had to rearrange the (Haversine) formula myself.
- As the equation uses the direct distance to calculate the new pair of points, it does not account for buildings/structures in the way and roads. Therefore, larger distances may yield routes longer than expected. I plan to fix this issue by binary searching from the route distance given back from the Google Maps API call. 

Users may create an account and save their own paths as well.
![WonderPath Profile Example](https://i.imgur.com/xmsZEdT.png)

~ Other screenshots of the site ~

Signup:

![WonderPath Signup Example](https://i.imgur.com/6jjxzYw.png)

Login:

![WonderPath Login Example](https://i.imgur.com/JgxllA3.png)

Home Panels:

![WonderPath Home Panel 1](https://i.imgur.com/PORFE2T.gif)
![WonderPath Home Panel 2](https://i.imgur.com/h1Ro3Ix.png)
![WonderPath Home Panel 3](https://i.imgur.com/FJfXict.png)
