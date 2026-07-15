import sqlite3

def check_db():
    conn = sqlite3.connect('c:/Users/samee/Desktop/hotelbooking/backend/rudrastay.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, original_price, discount_percentage, extra_guest_price, price_per_night FROM rooms")
    rows = cursor.fetchall()
    for r in rows:
        print(r)
    conn.close()

if __name__ == "__main__":
    check_db()
