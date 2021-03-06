# subskribe (under construction :construction:)

A movie and tv shows databse & subscription suggester based on user favourites.

Refereace website: https://reelgood.com/all

TODO: https://github.com/nowshad-sust/subskribe/projects

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
- Run `npm run start:dev` on both the instances.
- The `server` should be up on http://localhost:4000.
- The `client` should be up on http://localhost:3000.

# Application Workflow
- A `node-cron` job crawls movie data every 24 hours and updates/adds to the PostgreSQL database.
- REST APIs based on Node-Express queries database using TypeORM.
- React-Redux frontnend consumes the APIs and shows the data accordingly.

# API Documentation

<table>
  <tr>
    <th>METHOD</th>
    <th>ENDPOINT</th>
    <th>DESCRIPTION</th>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/login</td>
    <td>Logs in a user with credentials.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/register</td>
    <td>Register a new user.</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/auth/change-password</td>
    <td>Changes password of an existing user.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/programs</td>
    <td>Get paginated program list.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/programs/favourites</td>
    <td>Get user's favourites list.</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/programs/requests</td>
    <td>Get all requested programs as admin.</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/programs/requests</td>
    <td>Add a new program request.</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/programs/requests/approve</td>
    <td>Approve a pending program request.</td>
  </tr>
</table>
