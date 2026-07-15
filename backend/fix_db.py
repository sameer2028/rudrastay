import sqlite3
import os

db_path = "rudrastay.db"
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    try:
        conn.execute("ALTER TABLE rooms DROP COLUMN original_price")
        conn.commit()
        print("Dropped original_price column successfully.")
    except Exception as e:
        print(f"Error dropping column: {e}")
    conn.close()
