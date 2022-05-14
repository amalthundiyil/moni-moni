#!/bin/sh

chmod +x $PWD/delete_migrations.sh
chmod +x $PWD/reinit_db.sh
chmod +x $PWD/make_migrations.sh

$PWD/delete_migrations.sh
$PWD/reinit_db.sh
$PWD/make_migrations.sh