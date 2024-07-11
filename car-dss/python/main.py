# Import the necessary modules
import json
from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask import Flask, request
from compute import compute
from flask_cors import CORS

# Initialize the Firebase app
initialize_app()

# LOCAL TESTING
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Define the request handler using the decorator
@https_fn.on_request()
def process(req: https_fn.Request) -> https_fn.Response:
    try:
        # Parse the JSON request

        data = req.get_json()
        
        msrp = data.get('MSRP')
        mpg = data.get('MPG')
        Number_of_Doors = data.get('Number of Doors')
        Engine_HP = data.get('Engine HP')
        Year = data.get('Year')
        Highway_Percent = data.get('Highway Percent')
        Vehicle_Size = data.get('Vehicle Size')
        Engine_Fuel_Type = data.get('Engine Fuel Type')
        Transmission_Type = data.get('Transmission Type')
        Driven_Wheels = data.get('Driven Wheels')

        # Prepare the response with the model's slope and intercept
        response_data = compute(msrp, mpg, Number_of_Doors, 
                                Engine_HP, Year, Highway_Percent, 
                                Vehicle_Size, Engine_Fuel_Type, 
                                Transmission_Type, Driven_Wheels)
        
        print(response_data)

        # Return the response as JSON
        return https_fn.Response(response_data, status=200, headers={"Content-Type": "application/json"})
    
    except Exception as e:
        # Handle unexpected errors
        return https_fn.Response(f"An error occurred: {str(e)}", status=500)

if __name__ == "__main__":
    # If you need to run the app locally for testing purposes
    app = Flask(__name__)

    @app.route('/process', methods=['POST'])
    def test():
        # Call the function as it would be called by Firebase
        response = process(request)
        return response.data, response.status_code, response.headers

    app.run(debug=True)