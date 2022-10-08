#!/usr/bin/env python3

import psycopg2
import psycopg2.sql
import os

conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
filter = 4
lastrow = None

while True:
    with conn:
        with conn.cursor() as cur:
            if lastrow:
                filter = lastrow[0]
            query = psycopg2.sql.SQL("DROP DATABASE moni_moni_db")
            cur.execute(query, (filter,))
            print(cur.statusmessage)
            if cur.rowcount == 0:
                break
            lastrow = cur.fetchone()

conn.close()
