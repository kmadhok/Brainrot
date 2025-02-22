import assemblyai as aai
from dotenv import load_dotenv
import os 

load_dotenv()

aai.settings.api_key = os.getenv('assembly_api_key')

transcriber = aai.Transcriber()

transcript = transcriber.transcribe("/Users/kanumadhok/Downloads/brainrot/Shorter_Speech.mp3")

print(transcript.export_subtitles_srt())

# print(transcript.export_subtitles_vtt())
# Export SRT subtitles
srt_subtitles = transcript.export_subtitles_srt()
with open("/Users/kanumadhok/Downloads/brainrot/subtitles.srt", "w", encoding="utf-8") as srt_file:
    srt_file.write(srt_subtitles)
