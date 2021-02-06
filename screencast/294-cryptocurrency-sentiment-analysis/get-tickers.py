import urllib.request, json 
from jinja2 import Environment, FileSystemLoader

tickers = ''
for i in range(1, 11):
    endpoint = f'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page={i}&sparkline=false'

    with urllib.request.urlopen(endpoint) as url:
        data = json.loads(url.read().decode())
        for crypto in data:
            tickers = tickers + "'" + crypto['symbol'].upper() + "'" + ','
file_loader = FileSystemLoader('./')
env = Environment(loader=file_loader)
template = env.get_template('data.jinja2')
output = template.render(tickers=tickers)
with open("data.py", "w") as fh:
    fh.write(output)
