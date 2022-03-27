#!/bin/sh
docker run -d --rm --name bitcoin-server -it \
  -p 18443:18443 \
  -p 18444:18444 \
  -p 18332:18332 \
  ruimarinho/bitcoin-core:latest \
  -printtoconsole \
  -regtest \
  -server \
  -rpcallowip=172.17.0.0/16 \
  -rpcbind=0.0.0.0 \
  -rpcauth='jeff:632f5ba11fc80bd4d2e86263296a7196$33fa2312960b49fe49ebd9d80c3d411d1aaa355ed89dd306f8e6bba6368d8a36'