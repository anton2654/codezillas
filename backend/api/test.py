import requests
response = requests.delete("http://127.0.0.1:8000/api/user/1/fridge/remove/5")
print(response.json())
