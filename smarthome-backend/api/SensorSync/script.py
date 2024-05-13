import requests


def send_sms(phone):

    url = "https://sms77io.p.rapidapi.com/sms"

    payload = {
        "to": "+919723873082",
        "p": "64AAA196f79d887592F16f034Faf1B313647c615b10DDaa9c0eE929d60512D46",
        "text": "Hello nehansh , sms send karne ki api mil gayi",
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "fc588f8a83msh97316b495aaa075p1d5e0cjsn1a8ab11f60ee",
        "X-RapidAPI-Host": "sms77io.p.rapidapi.com",
    }

    response = requests.post(url, data=payload, headers=headers)

    return response.json()
