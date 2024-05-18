import requests


def send_sms(phone):

    url = "https://sms77io.p.rapidapi.com/sms"

    payload = {
        "to": "+91" + phone,
        "p": "b4441B8278375176D7164b4bdC2d274fc0Bb5b8690bB61d379192211ABCb8dC7",
        "text": "Hello User , your room temperature is more than safe temperature. Please check it.",
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "fc588f8a83msh97316b495aaa075p1d5e0cjsn1a8ab11f60ee",
        "X-RapidAPI-Host": "sms77io.p.rapidapi.com",
    }

    response = requests.post(url, data=payload, headers=headers)

    return response.json()
