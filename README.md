# Dotter

This is the definitive edition. [Previous version](https://github.com/aldahick/dotter.py), written in Python several years before this version.

## Description

Dotter is a game in which you are a dot, trying to catch all the other dots. If any of the other dots are alive for more than 10 seconds, you lose.

## Usage

1. Clone the repository
2. Install dependencies for React app: `cd web && yarn install`
3. Start the React app: `cd web && yarn start`

If you just want to contribute to the React app, no additional setup is required.

If you want to contribute to the engine (most of the game logic is here):

1. Install engine dependencies: `cd engine && yarn install`
2. Link the directory for usage in other modules (React): `cd engine && yarn link`
3. Use the linked engine version for the React app: `cd web && yarn link @dottergame/engine`
4. Run tests: `cd engine && yarn test` (you can also do `yarn test:dev` to avoid manually compiling)
