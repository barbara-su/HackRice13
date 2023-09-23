import tornado
import json
import methods as mtd
import openai
openai.api_key = "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"

# Define a request handler
class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        print('set headers!!')
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-type', 'application/json')
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header('Access-Control-Allow-Headers',
                        'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, X-Requested-By, Access-Control-Allow-Methods')


    def options(self):
        pass

class MainHandler(BaseHandler):
    def get(self):
        self.write("Hello, World!")
    def post(self):
        dct = json.loads(self.request.body.decode("utf-8"))
        past_msg = dct["messages"]

        print("past_msg", past_msg)
        title = dct["title"]
        file_content = mtd.txt_to_str("./Books/" + title + ".txt")

        starter_msg = {"role": "system", "content": "This is a txt file, I will ask you question on that: " + file_content + \
                   "\n Your answer should strictly follow the txt file.\
                    \n If I ask you things outside of the txt file, just supplement the answer with your own knowledge."}    


        past_msg.insert(0, starter_msg)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=past_msg,
        )

        answer = response["choices"][0]["message"]["content"]

        print()
        print(answer)
        self.write(answer)

class FileUpload(BaseHandler):
    def post(self):
        try:
            dct = json.loads(self.request.body.decode("utf-8"))
            title = dct["title"]
            content = dct["content"]
            path = "./Books/" + title + ".txt"
            mtd.str_to_txt(content, path)
            self.set_status(200)
            self.write("success")
        except:
            self.set_status(405)


def make_app():
    return tornado.web.Application([
        (r'/', MainHandler),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': './Books/'}),
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    port = 8888
    app.listen(port)
    tornado.ioloop.IOLoop.current().start()