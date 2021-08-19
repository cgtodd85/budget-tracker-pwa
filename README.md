# PWA Budget App

## deployed app: https://shielded-dusk-25870.herokuapp.com/

## Description

I wanted to create my first progressive web app by creating a simple budget tracker that allows the user to update their budget even if they lose internet connection. The files for the app are cached and all transactions entered by the user are cached until they get back online.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#Development)
- [Github Info](#github)
- [Contact](#contact)
- [License](#license)

## Installation

Fork this repo, clone on your machine, run npm i to install dependencies then npm start to start the server. Local server can be changed. Mongod must be running on your machine for it to work locally, or deploy the app and implement a MongoDB Atlas database.

## Usage

Simply input the type of transaction, the money amount, and click add or subtract. You'll see a chart representing your expenses over time.

## Development

Currently the chart does not show the offline values when offline though they are stored in IndexedDB. The values entered offline show up in the chart once back online. This functionality can be improved.

## Github Info

cgtodd85

## Contact

This project was created by Connor Todd.
Please contact me at cgtodd85@gmail.com with any questions.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
