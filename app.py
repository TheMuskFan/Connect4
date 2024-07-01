from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

ROWS = 6
COLUMNS = 7

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/game')
def game():
    return render_template('board.html')

@app.route('/create_board', methods=['POST'])
def create_board():
    board = [[None for _ in range(COLUMNS)] for _ in range(ROWS)]
    return jsonify(board=board)

@app.route('/make_move', methods=['POST'])
def make_move():
    data = request.json
    row, col, player, board = data['row'], data['col'], data['player'], data['board']
    
    print(f"Received move: row={row}, col={col}, player={player}")

    for r in range(ROWS - 1, -1, -1):
        if board[r][col] is None:
            board[r][col] = player
            print(f"Placed {player} at row={r}, col={col}")

            if check_win(r, col, player, board):
                print(f"{player} wins!")
                return jsonify(board=board, winner=player)
            
            if is_draw(board):
                print("It's a draw!")
                return jsonify(board=board, winner='draw')

            return jsonify(board=board, winner=None)

    print("Invalid move")
    return jsonify(error='Invalid move'), 400

def check_win(row, col, player, board):
    directions = [(0, 1), (1, 0), (1, 1), (1, -1)]
    for dr, dc in directions:
        count = 1
        count += count_in_direction(row, col, dr, dc, player, board)
        count += count_in_direction(row, col, -dr, -dc, player, board)
        if count >= 4:
            return True
    return False

def count_in_direction(row, col, dr, dc, player, board):
    count = 0
    r, c = row + dr, col + dc
    while 0 <= r < ROWS and 0 <= c < COLUMNS and board[r][c] == player:
        count += 1
        r += dr
        c += dc
    return count

def is_draw(board):
    return all(cell is not None for row in board for cell in row)

if __name__ == '__main__':
    app.run(debug=True)
