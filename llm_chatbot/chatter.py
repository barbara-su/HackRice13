# openai_key: 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
import openai
import pickle
# import json_process as json_process

openai.api_key = "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"

tst_msg = ""
try:
    tst_msg = pickle.load(open("tst/save.p", "r"))
except:
    print("no prev message")

# json_file = json_process.json_to_str("tst.json")

# print(json_file)

with open('frank_test.txt', 'rb') as file:
    # Read the entire contents of the file into a string
    file_contents = str(file.read())

# Now, file_contents contains the content of the file as a string
print(file_contents)

if len(tst_msg) > 0:
    messages = tst_msg
else: messages = [{"role": "system", "content": "This is a txt file, I will ask you question on that: " + file_contents + \
                   "\n Your answer should strictly follow the txt file.\
                    \n If I ask you things outside of the txt file, just supplement the answer with your own knowledge."}]

def update_message(messages, role, content):
    messages.append({"role": role, "content": content})
    return messages

while True:
    try:
        user_prompt = input()
        messages = update_message(messages, "user", user_prompt)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
        )
        answer = response["choices"][0]["message"]["content"]

        messages = update_message(messages, "assistant", answer)
        print(answer)
        print()
    except KeyboardInterrupt:
        break

# pickle.dump(messages,open( "tst/save.p", "wb" ))