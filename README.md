# subskribe (under construction :construction:)

A subscription suggester based on user interests

Ref: https://reelgood.com/all

# Prerequisites

- Docker
- NodeJS

# How to run

- Clone the repository `git clone https://github.com/nowshad-sust/subskribe.git`.
- Open terminal after running `cd subskribe`.
- Start `Posgtres` and `pgadmin` by running `docker-compose up -d`.
- Now `Posgtres` and `pgadmin` should be running on port `6543` and `5555` respectedly.
- Open two seperate terminal instance inside `client` and `server folder`.
- Run `npm install` on both the instances.
- Rrun `npm run start:dev` on both the instances.
- The `server` should be up on http://localhost:4000.
- The `client` should be up on http://localhost:3000.

# API DOCUMENTATION

<table>
  <tr>
    <th>METHOD</th>
    <th>ENDPOINT</th>
    <th>DESCRIPTION</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/login</td>
    <td>Logs in a user with credentials.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/register</td>
    <td>Register a new user.</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/change-password</td>
    <td>Changes password of an existing user.</td>
  </tr>
</table>
