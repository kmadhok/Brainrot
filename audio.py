import boto3
import time

def text_to_speech(text, output_file):

    polly_client = boto3.Session(
                    aws_access_key_id='',                  
        aws_secret_access_key='',
        region_name='us-east-1').client('polly')


    response = polly_client.synthesize_speech(
        Engine='neural',
        OutputFormat='mp3',
        SampleRate='8000',
        Text='All Gaul is divided into three parts',
        TextType='text',
        VoiceId='Joanna',
    )

    print(response)

    with open(output_file, 'wb') as file:
        file.write(response['AudioStream'].read())


if __name__ == "__main__":
    sample_text = "Hello, welcome to AWS Polly using neural voices!"
    # Define the output file name when calling the function:
    text_to_speech(sample_text, "output.mp3")
    print("Speech synthesis complete. Audio saved as output.mp3")