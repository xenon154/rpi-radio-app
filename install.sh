RPI_RADIO_DIR=$(pwd)

sudo apt-get update
sudo apt-get install make build-essential libraspberrypi-dev npm
sudo npm i express multer serve-index
cd && git clone https://github.com/markondej/fm_transmitter
cd fm_transmitter
make