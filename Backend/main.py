import tornado
import json
import methods as mtd
import openai
openai.api_key = "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"

# Define a request handler
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, World!")
    def post(self):
        dct = json.loads(self.request.body.decode("utf-8"))
        past_msg = dct["past_msg"]
        title = dct["title"]
        file_content = mtd.txt_to_str("Assets/" + title)
        starter_msg = [{"role": "system", "content": "This is a txt file, I will ask you question on that: " + file_content + \
                   "\n Your answer should strictly follow the txt file.\
                    \n If I ask you things outside of the txt file, just supplement the answer with your own knowledge."}]      


        past_msg.insert(0, starter_msg)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=past_msg,
        )
        answer = response["choices"][0]["message"]["content"]
        self.write(answer)

class FileUpload(tornado.web.RequestHandler):
    def post(self):
        try:
            dct = json.loads(self.request.body.decode("utf-8"))
            title = dct["title"]
            content = dct["content"]
            path = "Books/" + title
            mtd.str_to_txt(content, path)
            self.set_status(200)
            self.write("success")
        except:
            self.set_status(405)


def make_app():
    return tornado.web.Application([
        (r'/', MainHandler),
        (r"/Books/(.*)", tornado.web.StaticFileHandler,
        {"path": "./Books"})
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    port = 8888
    app.listen(port)
    tornado.ioloop.IOLoop.current().start()