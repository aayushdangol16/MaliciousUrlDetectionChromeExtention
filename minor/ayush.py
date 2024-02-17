from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import lstm
import numpy as np
import string

train_on_gpu=torch.cuda.is_available()

def add_spaces_around_punctuation(input_list):
    translation_table = str.maketrans({key: f' {key} ' for key in string.punctuation})
    result_list = [s.translate(translation_table) for s in input_list]
    result_list = [s.split() for s in result_list]

    return result_list

def pad_features(reviews_ints, seq_length):
    features = np.zeros((len(reviews_ints), seq_length), dtype=int)
    for i, row in enumerate(reviews_ints):
        features[i, -len(row):] = np.array(row)[:seq_length]
    return features

def predict(feature_tensor):
  with torch.no_grad():
    model.cuda()
    h = model.init_hidden(feature_tensor.size(0))
    model.eval()
    h = tuple([each.data for each in h])
    if(train_on_gpu):
      feature_tensor= feature_tensor.cuda()
    output,h = model(feature_tensor,h)
    pred = torch.round(output.squeeze())
    if(pred.item()==0):
      return 0
    else:
      return 1
    
checkpoint = torch.load('dangol.pth')
vocab_size=checkpoint['vocab_size']
output_size=checkpoint['output_size']
embedding_dim=checkpoint['embedding_dim']
hidden_dim=checkpoint['hidden_dim']
n_layers=checkpoint['n_layers']
batch_size=checkpoint['batch_size']
vocab_to_int=checkpoint['vocab_to_int']
state_dict=checkpoint['state_dict']


model=lstm.malicious(vocab_size, output_size, embedding_dim, hidden_dim, n_layers)
model.load_state_dict(checkpoint['state_dict'])
print(model)

def Predict(url):
  output_list = add_spaces_around_punctuation(url)
  reviews_ints = []
  for review in output_list:
    reviews_ints.append([vocab_to_int.get(word, 0) for word in review])
  seq_length = 364
  features = pad_features(reviews_ints, seq_length=seq_length)
  assert len(features)==len(reviews_ints), "Your features should have as many rows as reviews."
  assert len(features[0])==seq_length, "Each feature row should contain seq_length values."
  feature_tensor=torch.from_numpy(features)
  a=predict(feature_tensor)
  if(a==0):
     return 0
  else:
     return 1
    
app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    api_value =request.args.get('api', '')
    if not api_value.startswith('https://www.'):
      api_value = api_value.replace('https://', 'https://www.')
    api_value=[api_value]
    result=Predict(api_value)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
