#!/bin/sh

FILEPATH=$(realpath "${BASH_SOURCE:-$0}")
DIRPATH=$(dirname $FILEPATH)

chmod +x $DIRPATH/delete_migrations.sh
chmod +x $DIRPATH/reinit_db.sh
chmod +x $DIRPATH/make_migrations.sh

$DIRPATH/delete_migrations.sh
$DIRPATH/reinit_db.sh
$DIRPATH/make_migrations.sh