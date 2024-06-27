from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Constants for the number of rows and columns in the Connect 4 board
ROWS = 6
COLUMNS = 7

# Route for the homepage
@app.route('/')
def home():
    return render_template('home.html')

# Route for the game page with a specific mode (single player or multiplayer)
@app.route('/game/<mode>')
def game(mode):
    # Render the game board template, passing the mode as a variable
    return render_template('board.html', mode=mode)

# Route to create a new board
@app.route('/create_board', methods=['POST'])
def create_board():
    board = [[None for _ in range(COLUMNS)] for _ in range(ROWS)]
    return jsonify(board=board)

# Route to handle a move made by a player
@app.route('/make_move', methods=['POST'])
def make_move():
    # Get data from the request
    data = request.json
    row, col, player, board = data['row'], data['col'], data['player'], data['board']
    
    # Find the lowest empty spot in the column
    for r in range(ROWS - 1, -1, -1):
        if board[r][col] is None:
            board[r][col] = player
            # Check if this move wins the game
            if check_win(r, col, player, board):
                return jsonify(board=board, winner=player)
            # Check if the game is a draw
            if is_draw(board):
                return jsonify(board=board, winner='draw')
            # Continue the game
            return jsonify(board=board, winner=None)
    return jsonify(error='Invalid move'), 400

# Function to check if the current move wins the game
def check_win(row, col, player, board):
    # Directions to check for a win (horizontal, vertical, diagonal)
    directions = [(0, 1), (1, 0), (1, 1), (1, -1)]
    for dr, dc in directions:
        count = 1
        count += count_in_direction(row, col, dr, dc, player, board)
        count += count_in_direction(row, col, -dr, -dc, player, board)
        if count >= 4:
            return True
    return False

# Function to count consecutive pieces in a specific direction
def count_in_direction(row, col, dr, dc, player, board):
    count = 0
    r, c = row + dr, col + dc
    while 0 <= r < ROWS and 0 <= c < COLUMNS and board[r][c] == player:
        count += 1
        r += dr
        c += dc
    return count

# Function to check if the game is a draw
def is_draw(board):
    return all(cell is not None for row in board for cell in row)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
