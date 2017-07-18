require 'sinatra'
require 'clearbit'

helpers do
  def request_ip
    request.ip == '::1' ? test_request_ip : request.ip
  end

  def test_request_ip
    # Strictly for testing
    '24.136.96.110'
  end
end

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

post '/' do
  begin
    result = Clearbit::Risk.calculate(
      email: params[:email],
      name:  params[:name],
      ip:    request_ip
    )

    halt result.inspect
  rescue Nestful::Error => e
    # In case of network/server errors
    error 500, e.inspect
  end
end
