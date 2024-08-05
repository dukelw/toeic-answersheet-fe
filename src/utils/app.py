from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/ocr', methods=['POST'])
def ocr():
    data = request.get_json()
    file_path = data.get('file_path', '')

    try:
        result = subprocess.run(
            ['python', 'ocr.py'],
            capture_output=True,
            text=True,
            check=True
        )
        ocr_text = result.stdout.strip()
    except subprocess.CalledProcessError as e:
        ocr_text = f"Error: {e.stderr}"

    return jsonify({"text": ocr_text})

if __name__ == "__main__":
    app.run(debug=True)
