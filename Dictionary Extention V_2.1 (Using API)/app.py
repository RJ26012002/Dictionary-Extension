

# Import necessary modules
from flask import Flask, request, jsonify, make_response
import mysql.connector
from flask_cors import CORS
from flask import Flask, render_template
import requests

# Initialize Flask app
app = Flask(__name__)

# Allow CORS for all domains (for development only, you should restrict this in production)
CORS(app)


db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'database': 'dictionary',
}  

def lookup_word(word):
    url = f'https://dictionaryapi.com/api/v3/references/learners/json/{word}?key=b642c579-45d6-40fc-88ce-749364a2b6eb'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Failed to fetch data for word '{word}'. Status code: {response.status_code}")
        return None
    
@app.route('/get_Definitions', methods=['OPTIONS', 'POST'])



def get_definitions():
    if request.method == 'OPTIONS':
        # Respond to preflight requests
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    # Create a MySQL connection
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for clearer result

    try:
        data = request.json
        words = data.get('words', [])
        in_str = ""
        for ele in words:
            in_str+=ele
        print(f"the given string input is :{in_str}")
        print(type(in_str))

        result = lookup_word(in_str)

        if result:
            parts_of_speech_definitions={}

            for item in result:
                if isinstance(item, dict):
                    part_of_speech = item.get('fl')
                    meanings = []
                    examples = []

                    for definition in item.get('shortdef', []):
                        meanings.append(definition)
                    
                    for example_block in item.get('def',[]):
                        for example in example_block.get('sseq',[]):
                            for part in example:
                                if isinstance(part,list):
                                    if len(part) >= 2 and isinstance(part[1], dict):
                                        dt = part[1].get('dt', [])
                                    if dt and isinstance(dt[0], list) and len(dt[0]) >= 2:
                                        text = dt[0][1]
                                        text = text.replace('{bc}','')
                                        examples.append(text)
                    
                    if part_of_speech not in parts_of_speech_definitions:
                        parts_of_speech_definitions[part_of_speech] = {
                        'meanings': meanings[:2],  # Limit meanings to 2
                        'examples': examples[:2]   # Limit examples to 2
                    }

        # definitions = {}

        
        # for word in words:
        #     query = f"SELECT input_word, meaning FROM words WHERE  input_word = '{word}'"
        #     cursor.execute(query)
        #     results = cursor.fetchall()

        #     if results:
        #         for result in results:
        #             definitions[result['input_word']] = result['meaning']
        #     else:
        #         definitions[word] = 'Definition not found'

        # # Add definition 
        # entered_phrase = ' '.join(words)
        # entered_query = f"SELECT word, definition FROM dict_v1 WHERE word LIKE '%{entered_phrase}%' or word = '{word}'"
        # cursor.execute(entered_query)
        # entered_result = cursor.fetchall()

        # if entered_result:
        #     for result in entered_result:
        #         definitions[result['word']] = result['definition']
        # else:
        #     definitions[entered_phrase] = 'Definition not found for entered phrase'

        print('Received words:', words)
        print('Resulting definitions:', parts_of_speech_definitions)

        # Return definitions as JSON response
        response = jsonify(parts_of_speech_definitions)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()
        connection.close()

@app.route('/getDefinitions', methods=['OPTIONS', 'POST'])
def get_definition():
    if request.method == 'OPTIONS':
        # Respond to preflight requests
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    # Create a MySQL connection
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)  # Use dictionary cursor for clearer result

    try:
        data = request.json
        words = data.get('words', [])

        definitions = {}


        for word in words:
            query = f"SELECT input_word, meaning FROM words WHERE  input_word = '{word}'"
            cursor.execute(query)
            results = cursor.fetchall()

            if results:
                for result in results:
                    definitions[result['input_word']] = result['meaning']
            else:
                definitions[word] = 'Definition not found'

        
        # for word in words:
        #     query = f"SELECT input_word, meaning FROM words WHERE input_word LIKE '%{word}%' "
        #     cursor.execute(query)
        #     results = cursor.fetchall()

        #     if results:
        #         for result in results:
        #             definitions[result['input_word']] = result['meaning']
        #     else:
        #         definitions[word] = 'Definition not found'

        # # Add definition 
        # entered_phrase = ' '.join(words)
        # entered_query = f"SELECT input_word, meaning FROM words WHERE input_word LIKE '%{entered_phrase}%' "
        # cursor.execute(entered_query)
        # entered_result = cursor.fetchall()

        # if entered_result:
        #     for result in entered_result:
        #         definitions[result['input_word']] = result['meaning']
        # else:
        #     definitions[entered_phrase] = 'Definition not found for entered phrase'

        print('Received words:', words)
        print('Resulting definitions:', definitions)

        # Return definitions as JSON response
        response = jsonify(definitions)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        cursor.close()
        connection.close()

@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
