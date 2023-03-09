from converter import Converter
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'backend/temp'
app.secret_key = "1234"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# convert = Converter("/Users/sandro/Desktop/Coding/Jim Morrison psychedelic interview.mp3")
#
# convert.captions()


@app.route("/convert", methods=["POST"])
def convert():

    file = request.files['file']
    ALLOWED_EXTENSIONS = set(['mp3'])

    print(file)

    # if file:
    #     res = jsonify({'message': 'No file part in the request'})
    #     res.status_code = 400
    #     print(res)
    #     return res

    # return jsonify({'message': 'No file part in the request'})

    def allowed_file(file):
        return '.' in file and file.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    if not file:
        res = jsonify({'message': 'No file part in the request'})
        res.status_code = 400
        return res
    else:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        if (os.path.exists("backend/temp/"+file.filename)):
            converter = Converter()
            text = converter.captions(
                "backend/temp/"+file.filename)
        return jsonify(text)


if __name__ == "__main__":
    app.run(debug=True)
