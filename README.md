# Rostered v2.0.0
* Keep track of your hockey teams with schedules, games, and players.<br>
* Dashboard displays upcoming and recent games.<br>
* Swipe through your teams in the UI.<br>

Minimum Viable Product Live Link - [Rostered](https://rosteredv2.firebaseapp.com/)<br>
Currently only able to add and delete data.<br>

## Built with React, Redux, Material-UI, Firebase

* **React** used to separate everything into reusable components.

* **Redux** used to store user data from database by implementing `react-redux-firebase` and `redux-firestore`

* **Material-UI** used extensively to create a clean look and easy to style code.<br>
No CSS files. CSS is managed using **Material-UI**'s `withStyles` function to inject SCSS directly into the component.

* **Firebase** serves as the backend storing data in **Firestore**.<br>
Only a collection of users is implemented and all data is stored on your user document.<br>
A collection of exportable teams will be implemented in a new feature enabling users to import a team created by another user complete with all players, schedules, and games associated with the team.

## Future Features
In the future I am looking to add support for different sports.<br>
Game planning like setting lines.<br>
If possible a trash talk chat session where if you are playing another team that uses the app you can chat in the few days leading up to puck drop.<br>
