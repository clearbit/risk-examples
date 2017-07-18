from flask import Flask, jsonify, request, send_from_directory
import clearbit

app = Flask(__name__, static_url_path='')

test_remote_ip = '24.136.96.110'

def remote_ip():
  request_ip = request.remote_addr

  # Strictly for testing
  if request_ip == '127.0.0.1':
    request_ip = test_remote_ip

  return request_ip

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
      result = clearbit.Risk.calculate(
        email=request.form['email'],
        name=request.form['name'],
        ip=remote_ip()
      )

      return jsonify(result)

    else:
      return send_from_directory('public', 'index.html')


if __name__ == "__main__":
    app.run()
