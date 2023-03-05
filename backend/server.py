from converter import Converter
from flask import Flask,request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# convert = Converter("/Users/sandro/Desktop/Coding/Jim Morrison psychedelic interview.mp3")
#
# convert.captions()



@app.route("/convert", methods = ["get"])
def convert():
    filename = request.args.get('filename')
    convert = Converter(filename).captions()
    return jsonify(convert)



if __name__ == "__main__":
    app.run(debug=True)