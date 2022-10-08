#!/bin/bash

FILEPATH=$(realpath "${BASH_SOURCE:-$0}")
DIRPATH=$(dirname $FILEPATH)

chmod +x $DIRPATH/reset.sh
chmod +x $DIRPATH/seed.sh

$DIRPATH/reset.sh
$DIRPATH/seed.sh