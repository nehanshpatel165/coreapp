import requests


def send_sms(phone, request):

    url = "https://sms77io.p.rapidapi.com/sms"
    user = request.user.name
    payload = {
        "to": "+91" + phone,
        "p": "b4441B8278375176D7164b4bdC2d274fc0Bb5b8690bB61d379192211ABCb8dC7",
        "text": "Hello {} , your room temperature is more than safe temperature. Please check it.".format(
            user
        ),
    }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "fc588f8a83msh97316b495aaa075p1d5e0cjsn1a8ab11f60ee",
        "X-RapidAPI-Host": "sms77io.p.rapidapi.com",
    }
    print(payload)
    response = requests.post(url, data=payload, headers=headers)

    return response.json()


def send_otp(request):

    url = "https://d7-verify.p.rapidapi.com/verify/v1/otp/send-otp"

    payload = {
        "originator": "SignOTP",
        "recipient": "+91" + request.data.get("phone"),
        "content": "Greetings from IntelliHouse, your mobile verification code is: {}",
        "expiry": "600",
        "data_coding": "text",
    }
    headers = {
        "content-type": "application/json",
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiNTEwM2QzNGEtYWU3NC00N2EzLWEyZjktYmZiNjkxMTlhMDE5In0.V1uYDJvsWx2pzTMNQp3xLsSoeWTsXQ4DYPUh0QS4KuE",
        "X-RapidAPI-Key": "8a17ad2c03msh27c8ff6b80ab732p11b710jsn67007d065820",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()


def verify_otp(request, otp_id, otp):

    url = "https://d7-verify.p.rapidapi.com/verify/v1/otp/verify-otp"

    payload = {"otp_id": otp_id, "otp_code": otp}
    headers = {
        "content-type": "application/json",
        "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiNTEwM2QzNGEtYWU3NC00N2EzLWEyZjktYmZiNjkxMTlhMDE5In0.V1uYDJvsWx2pzTMNQp3xLsSoeWTsXQ4DYPUh0QS4KuE",
        "X-RapidAPI-Key": "8a17ad2c03msh27c8ff6b80ab732p11b710jsn67007d065820",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
    }

    response = requests.post(url, json=payload, headers=headers)

    return response.json()
