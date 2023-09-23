import pyttsx3
import PyPDF2
import openai

openai.api_key = "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"

def pdf_to_txt(path="sample.pdf"):
    book = open(path,'rb')
    pdfReader = PyPDF2.PdfReader(book)
    pages = len(pdfReader.pages)
    page = pdfReader.pages[0]
    text = page.extract_text()
    return text

def text_to_json(txt):
    # print(type(txt))
    msg = "Here is a content page for a pdf book. The number at the end of each line is the page number.\
    Please convert the content page into a json file that shows hierarchical structure."
    final_msg = msg + txt
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": final_msg},
        ]
    )
    return response['choices'][0]['message']['content']

text = pdf_to_txt()
print(text_to_json(text))