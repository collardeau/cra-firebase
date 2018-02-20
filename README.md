# CRA-Firebase

[Create React App](https://github.com/facebook/create-react-app)
 with some [Firebase](https://firebase.google.com/) functionality:

- automatic anonymous login
- firestore data hooks into react state via recompose
- cloud functions set up, with a `user().onCreate` trigger to create users in firestore.

## Get started

Clone the repo: `git clone https://github.com/collardeau/cra-firebase.git your-app`,
and update `package.json` with your app name

#### Set up Firebase

You might want to do this twice, for staging and production environments such as you have `my-app-staging` and my `my-app-production` as firebase projects:

- set ut your app at https://firebase.google.com

- enable anonymous login from the firebase console

- add your app configs to `src/config.js`

#### Install Firebase CLI

You'll need the firebase-tools installed globally, from which you can then login to your firebase account:

`npm install -g firebase-tools`
`firebase login`

#### Install the dependencies

`npm install` in the root folder AND in the `functions` folder as well.

**Make sure** you deploy the cloud functions before running the app, as this is used to create user profiles in firestore upon automatic login.

#### Deploy Cloud Functions

from the root folder:

`firebase use` to connect the right project, then:

`firebase deploy --only functions`

#### Devving

`npm run start` as per create-react-app.

