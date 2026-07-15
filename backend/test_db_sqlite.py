import asyncio
import sqlite3

def main():
    conn = sqlite3.connect("rudrastay.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, message FROM contact_messages")
    messages = cursor.fetchall()
    print(f"Total messages: {len(messages)}")
    for m in messages:
        print(f"[{m[0]}] {m[1]}: {m[2]}")
    conn.close()

if __name__ == "__main__":
    main()
