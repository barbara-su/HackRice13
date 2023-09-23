def txt_to_str(path):
    with open(path, 'rb') as file:
        file_contents = str(file.read())
    print(file_contents)
    return file_contents

def str_to_txt(path, content):
    with open(path, "w") as file:
    # Write the text to the file
        file.write(content)

# txt_to_str("./Books/frank_test.txt")