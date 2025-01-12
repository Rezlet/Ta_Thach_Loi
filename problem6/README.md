# Problem6

This API module is responsible for managing the live scoreboard, updating users' scores securely, and preventing malicious actions that could alter the scores without authorization.

## Overview

The scoreboard API service handles user score updates when an action is completed by the user on the website. It ensures that the score is updated in real-time and that malicious attempts to increase the score unfairly are blocked.

### To prevent malicious users from increasing scores without authorization,
- Token-Based Authentication: 
    Every score update request must include a valid authentication token to verify the user’s identity.
    As my diagram I was set cookie it could be a key hash been had by the algorithm.
    It will be sent to BE without process.
- Rate Limiting: 
    To avoid abuse, a rate limit is enforced on how often a user can submit score update requests.
    This will avoid lag for the backend when users are in a constant spam state.
    
### Improvements
- Caching: 
    If the system has to continue to receive a large number of users at the same time, caching will be an effective option.
    We can use services such as Redis to reduce the load on the database when a function is called too many times.