#! /bin/bash

echo "CREATE TABLE posts (id INTEGER PRIMARY KEY, time INTEGER, text TEXT);" | sqlite3 chan.db
