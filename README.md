# User Behavior Tracker

## Introduction

User Behavior Tracker is a React application that allows tracking and recording user actions on a webpage, including clicks, mouse movements, form submissions, and time spent on the page. The data is stored in `localStorage` and can be sent to a server.

## Features

- Track the number of clicks and mouse movements.
- Record the time users spend on the page.
- Track form submissions.
- Store user action data in `localStorage`.
- Send data to the server via an API.

## Installation

### Requirements

- Node.js (>= 14.x)
- Yarn

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/strangerdeveloper2810/user-behavior-tracker.git
   cd user-behavior-tracker
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the application:
   ```bash
   yarn start
   ```

## Project Structure

- `src/`: Directory containing the source code of the application.
  - `components/`: Contains reusable React components.
    - `Navbar/`: Navigation bar component.
    - `ProgressBar/`: Component for displaying progress.
    - `UserActivityChart/`: Component for displaying user activity in a chart.
    - `UserActivityTracker/`: Component for tracking user actions.
  - `pages/`: Contains page components.
    - `Dashboard/`: Dashboard page component.
    - `Home/`: Home page component.
  - `routes/`: Contains routing components and configuration.
    - `index.tsx`: Main routing configuration.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point of the application.
  - `App.css`: Main styles for the application.

## Usage

- As users interact with the page, their actions will be recorded and displayed in the `UserActivityTracker`.
- Users can submit a form to log information and send data to the server.

## Notes

- Data is stored in `localStorage` and can be accessed again upon page reload.
- Ensure that your server has an API to receive data from the application.

## References

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Lodash](https://lodash.com/)

## License

This project is licensed under the [MIT License](LICENSE).
