# Import the necessary modules
import json
from flask import Flask, request
from firebase_functions import https_fn
from firebase_admin import initialize_app
import numpy as np
from sklearn.linear_model import LinearRegression

# Initialize the Firebase app
initialize_app()

# Define the request handler using the decorator
@https_fn.on_request()
def process(req: https_fn.Request) -> https_fn.Response:
    try:
        # Parse the JSON request
        data = req.get_json()
        x = data.get('x')
        y = data.get('y')

        if not x or not y:
            return https_fn.Response("Invalid input data", status=400)

        # Convert x and y to numpy arrays and reshape x for sklearn
        x_np = np.array(x).reshape(-1, 1)
        y_np = np.array(y)

        # Create and fit the linear regression model
        model = LinearRegression().fit(x_np, y_np)

        # Prepare the response with the model's slope and intercept
        response_data = {
            "slope": model.coef_[0].tolist(),
            "intercept": model.intercept_.tolist()
        }

        # Return the response as JSON
        return https_fn.Response(json.dumps(response_data), status=200, headers={"Content-Type": "application/json"})
    
    except Exception as e:
        # Handle unexpected errors
        return https_fn.Response(f"An error occurred: {str(e)}", status=500)