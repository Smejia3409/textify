import os
import openai

# gets api key from env variable
openai.api_key = os.getenv("OPEN_AI_KEY")


class Converter:
    def __init__(self, file):
        self.file = file



    def captions(self):
        open_file = open(self.file, "rb")
        transcript = openai.Audio.transcribe("whisper-1",open_file )
        return transcript