# Malicious Url Detection Using LSTM
## Introduction
Our project involves creating a Chrome extension that utilizes LSTM (Long Short-Term Memory) to block malicious URLs. LSTM is a type of recurrent neural network (RNN) well-suited for sequential data like URLs, as it can learn patterns and dependencies over time. The extension will likely analyze the URL patterns and characteristics, feeding them into the LSTM model, which will then classify them as malicious or safe. When a user attempts to visit a URL, the extension will consult the LSTM model to determine if it's safe to proceed or if it should be blocked to protect the user from potential threats. This approach combines deep learning with browser functionality to enhance cybersecurity for users.
## Installation
1. Clone the repository<br>
```bash
git clone https://github.com/aayushdangol16/Minor.git
```
2. Install the required libraries<br>
```bash
cd minor
pip install -r requirements.txt
```
## Usage
1. Activate developer mode in your Chrome browser and then proceed to upload the extension folder to Chrome extensions
2. Execute the Python script by following these commands<br>
```bash
cd minor
python ayush.py
```
4. Enable the extension and start enjoying its features
