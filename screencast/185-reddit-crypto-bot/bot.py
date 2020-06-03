#!/usr/bin/python3
# Code originally found here: https://github.com/frosty00/ethtrader-daily-comment-bot/blob/dev/dailypricebot.py
import requests
import re
import numpy as np
from calendar import month_abbr
from datetime import date

import praw
import demjson
from bs4 import BeautifulSoup

from imgurapi import get_gif


def querycmc():
    return demjson.decode(requests.get('https://coinmarketcap-nexuist.rhcloud.com/api/eth').text, decode_float=float)


def load_historical_data():
    months = list(month_abbr)
    source = 'https://coinmarketcap.com/currencies/ethereum/historical-data/?start=20150808&end=1', 'https://etherscan.io/chart/tx?output=csv'
    soup = BeautifulSoup(requests.get(source[0]).text, 'html.parser')

    cmc = [[float(d.replace(',', '')) if d[0].isdecimal() else d for d in [tag.string for tag in el.findAll('td')]]
           for el in soup.table.tbody.findAll('tr')]
    transactions = [[int(x) if '/' not in x else x for x in [i.strip('"') for i in line.split(',')]]
                    for line in requests.get(source[1]).text.splitlines()[1:]][::-1]

    m, d, y = map(int, transactions[0][0].split('/'))
    most_recent_etherscan = date(y, m, d)
    most_recent_cmc = next(map(lambda x: date(int(x[2]), months.index(x[0]), int(x[1][:-1])), (r[0].split() for r in cmc)))
    print(most_recent_etherscan, most_recent_cmc, date.today())
    assert most_recent_cmc == most_recent_etherscan < date.today()

    return [((h[2] + h[3]) / 2, h[5], h[6], t[2]) for h, t in zip(cmc[1:], transactions)]


def get_aths(eth_data):
    return list(np.array(eth_data).max(axis=1))


def select_phrase(change):
    phrases = ['Hodl onto to your hats boys, it looks like we\'re at ${}',
               'Oh look at that, we\'re still at around ${}',
               'Nice, we\'re up to ${} today!',
               '#${} - TO THE [MOON](' + get_gif('moon') + ')']
    if change < -5:
        return phrases[0]
    elif change < 5:
        return phrases[1]
    elif change < 10:
        return phrases[2]
    else:
        return phrases[3]


def main():
    footer = 'I\'m a bot, *bleep, bloop* | [source_code](https://pastebin.com/7fNH0csF) |\
              [FAQ](https://www.reddit.com/r/ethtrader/comments/6uhayr/introducing_a_new_ethereum_analytics_bot/) |\
              [hodl](https://www.ethhodler.org/) | /u/jadenpls'

    reddit = praw.Reddit('bot1', user_agent='python')
    ethtrader = reddit.subreddit('ethtrader')
    daily = max((i.created_utc, i) for i in ethtrader.hot(limit=2) if i.stickied and 'Daily' in i.title)[1]

    eth_data = load_historical_data()
    transactions = eth_data[0][3]
    d = querycmc()
    price, volume, marketcap = map(int, (d['price']['usd'], d['volume']['usd'], d['market_cap']['usd']))
    aths = get_aths(eth_data)
    prices = [i[0] for i in eth_data]
    change = list(map(lambda x: ((price / x) - 1), (prices[0], prices[6], prices[28], prices[364])))
    phrase = select_phrase(change[0]).format(round(price), -1)

    new_aths = [(name, value) for name, value, ath in zip(('price', 'volume', 'market capitalization', 'transactions'),
                (price, volume, marketcap, transactions), aths) if value > ath]

    ath_announce = '\n\n'.join('#NEW {} ALL TIME HIGH OF {:,}!'.format(ath[0].upper(), ath[1]) for ath in new_aths)

    table = '| **Daily** | **Weekly** | **Monthly** | **Yearly** |\n|:-:|:-:|:-:|:-:|\n'\
            '| {:.2%} | {:.2%} | {:.2%} | {:.2%} |'.format(*change)

    daily.reply(
                '\n\n'.join((phrase, table, '*Guess I\'ll check the price tomorrow...*', ath_announce, '---',
                            ''.join(' ^^'+w if w[0] != '*' else ' *'+'^^'+w[1:] for w in footer.split())))
                )

    print('Wrote comment successfully.')

if __name__ == '__main__':
    main()
