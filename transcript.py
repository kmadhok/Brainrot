import os
from llama_index.llms.openai import OpenAI
from llama_index.core import PromptTemplate
import os 
from dotenv import load_dotenv
load_dotenv(dotenv_path='E:\Brainrot\transcript\.env')


# OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
# print("Loaded API Key:", OPENAI_API_KEY)


print("Loaded API Key:", OPENAI_API_KEY)

# Initialize OpenAI LLM
llm = OpenAI(
    api_key=OPENAI_API_KEY,
    temperature=0.7,
    model_name="text-davinci-003",
    max_tokens=512
)

# Function to Generate a Story
def generate_story(prompt: str) -> str:
    template = PromptTemplate(template=prompt)
    return llm.predict(template)

# Define Story Prompt
prompt = (
    """
    Create a short-form video transcript optimized for YouTube Shorts, Instagram Reels, and TikTok. The transcript should capture attention within the first three seconds and maintain engagement throughout. The content can be about any topic, but it should be engaging, concise, and have a strong call to action at the end. The transcript should be structured as follows:
    Hook (First 3 Seconds): A surprising fact, a bold statement, or a question that instantly grabs the viewer’s attention.
    Value Delivery (10-30 Seconds): Engaging storytelling, educational insight, or actionable tips presented in a dynamic way.
    Call-to-Action (Last 3 Seconds): Encourage interaction, such as asking a question, following, liking, or commenting.
    Ensure the tone is conversational and high-energy, making use of short, punchy sentences. If the topic requires humor or storytelling, integrate it naturally to keep the audience engaged. The transcript should be between 30 to 60 seconds long, ensuring it fits the short-form video format perfectly.
    """
)

# Generate the Story
story = generate_story(prompt)

# Display Generated Story
print("Generated Story:\n")
print(story)

