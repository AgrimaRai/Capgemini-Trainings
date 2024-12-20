**Player Management System:**
A Java application that performs CRUD operations on player data using JDBC.

**Objective:** 
Create a Java application that manages player data with CRUD operations (Create, Read, Update, Delete) using JDBC.

**Player Data Model:**

| Field         | Type    | Description                                    |
|---------------|---------|------------------------------------------------|
| id            | Integer | Player ID                                      |
| name          | String  | Player's name                                  |
| skill         | String  | Skill of the player (e.g., Bowler, Batsman)   |
| exp           | Integer | Experience in years                            |
| country       | String  | Country of the player                         |
| overall_score | Double  | Overall score based on performance            |

**CRUD Operations:**
- **Create**: Add a new player to the database
- **Read**: Fetch players from the database based on various conditions
- **Update**: Update player details (skill, experience, etc.)
- **Delete**: Remove a player from the database

**Data Operations:**
- Sort players based on their skill
- List players by country
- List players by experience (highest to lowest)
