RPI_RADIO_DIR=$(pwd)

mkdir uploads
sudo apt-get update
sudo apt-get install make build-essential libraspberrypi-dev npm sox libsox-fmt-mp3 libsndfile1-dev
sudo npm i express multer serve-index socket.io mp3-to-wav
cd
if test -d ~/fm_transmitter; then
  echo "FM transmitter directory already present. If this is a mistake, please remove the directory at ~/fm_transmitter and run this script again."
else 
    git clone https://github.com/ChristopheJacquet/PiFmRds.git fm_transmitter
    cd fm_transmitter/src
    make clean
    make
fi