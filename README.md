# Connect4
A web-based Connect 4 game built using Python, Flask, HTML, CSS, and JavaScript. Challenge your friends or play against an AI opponent in this classic strategy game.

Features
Backend: Developed with Python and Flask to handle game logic, player authentication, and game history tracking.
Frontend: Implemented using HTML, CSS, and JavaScript to provide a seamless and responsive user interface.
Player Authentication: Incorporates user registration and login functionality to personalize the gaming experience.
Game History Tracking: Utilizes a PostgreSQL database to track game outcomes and player statistics, enhancing user engagement.
AI Opponent: Features an advanced AI with varying difficulty levels for a challenging single-player mode.
Dynamic Game Board: Click-to-play functionality, dynamic turn indicator, and visual cues for winning moves.
Easy Game Reset: Quickly start a new game with the reset option.
Getting Started
Prerequisites
Python 3.x
Flask
PostgreSQL
Node.js and npm (for JavaScript dependencies)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/TheMuskFan/Connect4.git
cd Connect4
Set up a virtual environment:

bash
Copy code
python -m venv venv
source venv/bin/activate   # On Windows use `venv\Scripts\activate`
Install Python dependencies:

bash
Copy code
pip install -r requirements.txt
Set up PostgreSQL database:

Create a database named connect4.
Configure your database settings in config.py.
Run database migrations:

bash
Copy code
flask db upgrade
Install JavaScript dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
flask run
Open your browser and navigate to http://127.0.0.1:5000 to see the game in action.

Usage
Register for an account or log in if you already have one.
Start a new game and choose to play against a friend or the AI.
View your game history and statistics on your profile page.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Inspiration and guidance from the online developer community.
Libraries and frameworks used in this project.
Contact
For any questions or feedback, please contact Your Name.


