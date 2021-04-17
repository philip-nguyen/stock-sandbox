import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
	
@app.route('/stock-invest', methods=["POST"])
def getStock():
    # Validate the request body contains JSON
    if request.is_json:
        req = request.get_json()

        print("Request: ", req)

        return "Stock symbol received", 200
    
    else:
        return "Request was not JSON", 400