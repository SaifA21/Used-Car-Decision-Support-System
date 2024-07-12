import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

def compute(msrp, mpg, number_of_doors, 
            engine_HP, year, highway_percent, vehicle_size, 
            engine_fuel_type, transmission_type, driven_wheels):

    try:

        user_preferences = {
            'MSRP': msrp,
            'MPG': mpg,
            'Number of Doors': number_of_doors,
            'Engine HP': engine_HP,
            'Year': year,
            'Highway Percent': highway_percent,
            'Vehicle Size': vehicle_size,
            'Engine Fuel Type': engine_fuel_type,
            'Transmission Type': transmission_type,
            'Driven Wheels': driven_wheels
        }

        print(user_preferences)

        if not user_preferences["Engine Fuel Type"]:
            user_preferences["Engine Fuel Type"] = ["Electric", "Diesel", "Gasoline"]

        if not user_preferences["Transmission Type"]:
            user_preferences["Transmission Type"] = ["Manual", "Automatic", "Direct_Drive"]

        if not user_preferences["Driven Wheels"]:
            user_preferences["Driven Wheels"] = ['rear wheel drive', 'front wheel drive', 'all wheel drive', 'four wheel drive']

        pd.set_option('display.max_columns', 10)
        df = pd.read_csv('data.csv')

        df = df.drop(columns=['Engine Cylinders', 'Market Category', 'Vehicle Style', 'Popularity'])
        df = df.dropna()

        df['MPG'] = df["highway MPG"]*user_preferences["Highway Percent"] + df["city mpg"]*(1-user_preferences["Highway Percent"])

        fuel_type_mapping = {
            'Gasoline': ['premium unleaded (required)', 'regular unleaded', 'premium unleaded (recommended)', 'flex-fuel (unleaded/E85)', 'flex-fuel (premium unleaded recommended/E85)', 'flex-fuel (premium unleaded required/E85)'],
            'Electric': ['electric'],
            'Diesel': ['diesel', 'natural gas']
        }

        transmission_type_mapping = {
            'Manual': ['MANUAL'],
            'Automatic': ['AUTOMATIC', 'AUTOMATED_MANUAL'],
            'Direct_Drive': ['DIRECTED_DRIVE']
        }


        engine_fuel_types = []
        for fuel_type in user_preferences['Engine Fuel Type']:
            engine_fuel_types.extend(fuel_type_mapping.get(fuel_type, []))


        transmission_types = []
        for transmission_type in user_preferences['Transmission Type']:
            transmission_types.extend(transmission_type_mapping.get(transmission_type, []))


        driven_wheels_options = user_preferences['Driven Wheels']


        filtered_df = df[
            df['Engine Fuel Type'].isin(engine_fuel_types) &
            df['Transmission Type'].isin(transmission_types) &
            df['Driven_Wheels'].isin(driven_wheels_options)
        ].copy()


        vehicle_size_mapping = {'Compact': 1, 'Midsize': 2, 'Large': 3}
        filtered_df['Vehicle Size'] = filtered_df['Vehicle Size'].map(vehicle_size_mapping)

        filtered_df['Vehicle Size'] = filtered_df['Vehicle Size'].astype(int)

        all_features = ['MSRP', 'MPG', 'Engine HP', 'Number of Doors', 'Year', 'Vehicle Size']

        features = [feature for feature in all_features if user_preferences[feature] != ""]

        #Scale all dataset features
        scaler = StandardScaler()
        X = scaler.fit_transform(filtered_df[features])

        def mydist(x, y):
            price_diff = 0
            mpg_diff = 0
            hp_diff = 0
            yr_diff = 0

            #If user preferences price is higher than a specific car in the dataset add positive factor
            if x[0] < y[0]:
                price_diff = y[0] - x[0]
                price_diff *= 0.5  # add positive factor to difference; positive factors equates to further distance

            #MPG
            if x[1] < y[1]:
                mpg_diff = y[1] - x[1]
                mpg_diff *= -0.3  # subtract positive factor from difference (making it smaller)

            #HorsePower
            if x[2] < y[2]:
                hp_diff = y[2] - x[2]
                hp_diff *= -0.3

            #Year
            if x[3] < y[3]:
                year_diff = y[2] - x[2]
                year_diff *= -0.3
            return np.sqrt(np.sum((x - y) ** 2)) + price_diff + mpg_diff + hp_diff + yr_diff

        k = 30 #Set at 30 to ensure top 5 results can filter out duplicates (i.e. everything the same except for trim)

        #Set up KNN function using euclidian distance considering applied weights in custom function
        knn = NearestNeighbors(n_neighbors=k, metric='pyfunc', metric_params={"func":mydist})
        knn.fit(X)
        #Scale all of the user preference features
        user_pref_values = np.array([user_preferences[feature] for feature in features]).reshape(1, -1)
        user_pref_df = pd.DataFrame(user_pref_values, columns=features)
        user_pref_scaled = scaler.transform(user_pref_df)
        #Run KNN model
        distances, indices = knn.kneighbors(user_pref_scaled)

        best_matches = filtered_df.iloc[indices[0]]

        best_matches = best_matches.drop_duplicates(subset=['Make', 'Model', 'Year'])

        results = best_matches.head(5)

        car_dict = {}

        for i, row in results.iterrows():
            car_dict[i] = row.tolist()

        print(results)

        return json.dumps(car_dict)

    except ValueError:
        return "Invalid user preferences", 400
    
if __name__ == "__main__":
    import sys
    msrp = sys.argv[1]  
    mpg = sys.argv[2]
    number_of_doors = sys.argv[3]
    engine_HP = sys.argv[4]
    year = sys.argv[5]
    highway_percent = sys.argv[6]
    vehicle_size = sys.argv[7]
    engine_fuel_type = sys.argv[8]
    transmission_type = sys.argv[9]
    driven_wheels = sys.argv[10]
    results = compute(msrp, mpg, number_of_doors, engine_HP, year, highway_percent, vehicle_size, engine_fuel_type, transmission_type, driven_wheels)