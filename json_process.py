import json
def json_to_str(path):
    # Specify the path to your JSON file
    json_file_path = path

    # Open and read the JSON file
    with open(json_file_path, "r") as json_file:
        json_data = json_file.read()

    # Now, json_data contains the JSON content as a string
    return json_data

# print(json_to_str("tst.json"))