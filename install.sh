RPI_RADIO_DIR=$(pwd)

sudo apt-get update
sudo apt-get install make build-essential libraspberrypi-dev 
npm install express
cd && git clone https://github.com/markondej/fm_transmitter
cd fm_transmitter
make