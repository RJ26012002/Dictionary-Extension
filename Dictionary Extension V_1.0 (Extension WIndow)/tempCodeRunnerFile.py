

from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Replace with your MySQL connection details
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'database': 'dictionary',
}   # Database configuration

# Create a MySQL connection
connection = mysql.connector.connect(**db_config)

# Handle requests from the Chrome extension
@app.route('/getDefinitions', methods=['POST'])
def get_definitions():
    cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for clearer result

    try:
        data = request.json
        words = data.get('words', [])

        definitions = {}

        for word in words:
            query = f"SELECT meaning FROM words WHERE word = '{word}'"
            cursor.execute(query)
            result = cursor.fetchone()

            if result:
                definitions[word] = result['meaning']
            else:
                definitions[word] = 'Definition not found'

        # Add definition for the entered phrase
        entered_phrase = ' '.join(words)
        entered_query = f"SELECT meaning FROM words WHERE word = '{entered_phrase}'"
        cursor.execute(entered_query)
        entered_result = cursor.fetchone()

        if entered_result:
            definitions[entered_phrase] = entered_result['meaning']
        else:
            definitions[entered_phrase] = 'Definition not found for entered phrase'

        print('Received words:', words)
        print('Resulting definitions:', definitions)

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()

    return jsonify(definitions)

if __name__ == '__main__':
    app.run(debug=True)

