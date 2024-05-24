RPI_RADIO_DIR=$(pwd)

mkdir uploads
sudo apt-get update
sudo apt-get install make build-essential libraspberrypi-dev npm
sudo npm i express multer serve-index socket.io
cd
if test -d ~/fm_transmitter; then
  echo "FM transmitter directory already present. If this is a mistake, please remove the directory at ~/fm_transmitter and run this script again."
else 
    git clone https://github.com/markondej/fm_transmitter
    cd fm_transmitter
    make
fi