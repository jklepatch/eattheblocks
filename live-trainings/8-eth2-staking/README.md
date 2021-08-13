# Ethereum 2.0 Staking

## Commands

### Download client
```
sudo apt install curl gnupg

curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor > bazel.gpg

sudo mv bazel.gpg /etc/apt/trusted.gpg.d/

echo "deb [arch=amd64] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list

sudo apt update && sudo apt install bazel

sudo apt update && sudo apt full-upgrade

sudo apt update && sudo apt install bazel-3.7.0

sudo apt install -y libtinfo5

sudo apt-get install -y libssl-dev 

sudo apt-get install -y libgmp-dev
```

Check latest version at https://github.com/prysmaticlabs/prysm/releases

And replace this link if needed
```
git clone -b v1.4.3 --single-branch https://github.com/prysmaticlabs/prysm.git

cd prysm

bazel build //beacon-chain:beacon-chain --config=release

bazel build //validator:validator --config=release

```

### Run beacon node

```
sudo nano /etc/systemd/system/prysm-beaconchain.service
```

Adapt path, user & group:

```
[Unit]
Description=Prysm Beaconchain
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=root
Group=root
Restart=always
RestartSec=5
ExecStart=/root/prysm/bazel-bin/cmd/beacon-chain/beacon-chain_/beacon-chain --pyrmont --http-web3provider=<ETH1 endpoint> --accept-terms-of-use

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload

sudo systemctl start prysm-beaconchain

sudo systemctl status prysm-beaconchain

sudo systemctl enable prysm-beaconchain

sudo journalctl -fu prysm-beaconchain.service
```

### Create validator keys

Check latest version there https://github.com/ethereum/eth2.0-deposit-cli/releases/

And replace this link if needed
```
wget https://github.com/ethereum/eth2.0-deposit-cli/releases/download/v1.2.0/eth2deposit-cli-256ea21-linux-amd64.tar.gz

tar -xvf eth2deposit-cli-256ea21-linux-amd64.tar.gz

cd eth2deposit-cli-256ea21-linux-amd64

./deposit new-mnemonic --num_validators 1 --mnemonic_language=english --chain pyrmont
```

### Run validator

```
bazel run //validator:validator -- accounts import --keys-dir=/root/eth2deposit-cli-256ea21-linux-amd64/validator_keys --accept-terms-of-use --pyrmont

Write your password inside the file

```
sudo nano ../password.txt

sudo nano /etc/systemd/system/prysm-validator.service
```

```
[Unit]
Description=Validator
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=root
Group=root
Restart=always
RestartSec=5
ExecStart=/root/prysm/bazel-bin/cmd/validator/validator_/validator --pyrmont --wallet-dir=/root/.eth2validators/prysm-wallet-v2/ --wallet-password-file=/root/test.txt --accept-terms-of-use

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl start prysm-validator
sudo systemctl status prysm-validator
sudo systemctl enable prysm-validator
sudo journalctl -fu prysm-validator.service
```

### Launchpad deposit process

```
scp <origin> <desination>
```

pyrmont.launchpad.ethereum.org


https://discord.gg/7z8wzehjrJ

```
!goerliEth2 <YOUR-HEX-DATA>
```

Tutorial for the html manipulation https://www.youtube.com/watch?v=uur7hGCscak

## Monitoring

### Prometheus
```
sudo useradd --no-create-home --shell /bin/false prometheus

sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

sudo chown -R prometheus:prometheus /etc/prometheus
sudo chown -R prometheus:prometheus /var/lib/prometheus

curl -LO https://github.com/prometheus/prometheus/releases/download/v2.22.0/prometheus-2.22.0.linux-amd64.tar.gz

tar -xvf prometheus-2.22.0.linux-amd64.tar.gz

sudo cp prometheus-2.22.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.22.0.linux-amd64/promtool /usr/local/bin/

sudo chown -R prometheus:prometheus /usr/local/bin/prometheus
sudo chown -R prometheus:prometheus /usr/local/bin/promtool

sudo cp -r prometheus-2.22.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.22.0.linux-amd64/console_libraries /etc/prometheus

sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

sudo nano /etc/prometheus/prometheus.yml
```

```
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).
# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093
# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  - job_name: 'validator'
    static_configs:
      - targets: ['localhost:8081']
  - job_name: 'beacon node'
    static_configs:
      - targets: ['localhost:8080']
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```

```
sudo chown -R prometheus:prometheus /etc/prometheus/prometheus.yml

sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

sudo nano /etc/systemd/system/prometheus.service
```

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target
[Service]
Type=simple
User=prometheus
Group=prometheus
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl status prometheus

sudo systemctl enable prometheus
```

### Node Exporter
```
sudo useradd --no-create-home --shell /bin/false node_exporter

curl -LO https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

tar -xvf node_exporter-1.0.1.linux-amd64.tar.gz

sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown -R node_exporter:node_exporter /usr/local/bin/node_exporter

sudo nano /etc/systemd/system/node_exporter.service
```

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl status node_exporter
sudo systemctl enable node_exporter
```

### Grafana
```
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt update
apt-cache policy grafana // Make sure Grafana is installed from the repository.
sudo apt install grafana

sudo systemctl start grafana-server
sudo systemctl status grafana-server
sudo systemctl enable grafana-server
```
