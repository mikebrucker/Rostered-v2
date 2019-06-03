# Rostered v2.0.0

- Keep track of your hockey teams with schedules, games, and players.<br>
- Dashboard displays upcoming and recent games.<br>
- Change the theme's primary color to match your team.<br>
- Import/Export teams for other teammates to use.<br>
- Swipe between login and signup in the UI.<br>
- Swiping between teams is too slow and buggy in the browser version and has been removed.<br>

Minimum Viable Product Live Link - [Rostered](https://rostered.mikebrucker.com/)<br>

## Built with React, Redux, Material-UI, Firebase

- **React** used to separate everything into reusable components.

- **Redux** used to store user data from database by implementing `react-redux-firebase` and `redux-firestore`

- **Material-UI** used extensively to create a clean look and easy to style code.<br>
  No CSS files. CSS is managed using **Material-UI**'s `withStyles` function to inject SCSS directly into the component.

- **Firebase** serves as the backend storing data in **Firestore**.<br>
  I am using a collection of users to keep all pertinent data stored on the user document.<br>
  A collection of exportable teams has been implemented in a new feature enabling users to import a team created by another user complete with all players, schedules, and games associated with the team.

## Future Features

In the future I am looking to add support for different sports.<br>
Team Logos.<br>
Game planning like setting lines.<br>
If possible a trash talk chat session where if you are playing another team that uses the app you can chat in the few days leading up to puck drop.<br>
