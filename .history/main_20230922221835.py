# Note: you need to be using OpenAI Python v0.27.0 for the code below to work
import openai
audio_file= open("tst.m4a", "rb")
transcript = openai.Audio.translate("whisper-1", audio_file)