const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function init(txs) {
  const credentials = await getCredentials();
  const oAuth2Client = await authorize(credentials);
  const result = await update(oAuth2Client, txs);
  return result.data.updatedRows;
}

function getCredentials() {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.GOOGLE_CREDENTIALS_PATH, (err, content) => {
      if (err) reject(`Error loading client secret file: ${err}`);
      resolve(JSON.parse(content));
    });
  });
}

function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  return new Promise((resolve, reject) => {
    fs.readFile(process.env.GOOGLE_TOKEN_PATH, (err, token) => {
      if (err) return resolve(getNewToken(oAuth2Client));
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(`Error while trying to retrieve access token ${err}`);
        oAuth2Client.setCredentials(token);
        fs.writeFile(process.env.GOOGLE_TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return reject(err);
          console.log(`Token stored to ${process.env.GOOGLE_TOKEN_PATH}`);
        });
        resolve(oAuth2Client);
      });
    });
  });
}

function update(auth, values) {
  const sheets = google.sheets({version: 'v4', auth});
  const headers = ['txHash', 'date', 'from', 'to', 'assetValue', 'assetName', 'assetAddress', 'gasUsed', 'gasPrice', 'cashflowAssetUSD', 'cashflowTxFeeUSD', 'PnL'];
  values.unshift(headers);
  const resource = {
    values
  };
  const range = `${process.env.GOOGLE_SHEET}!R1C1:R${values.length}C12`;

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SPREADSHEETID,
      range,
      resource,
      valueInputOption: 'USER_ENTERED'
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = init;
