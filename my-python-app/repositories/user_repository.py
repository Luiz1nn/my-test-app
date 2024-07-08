import sqlite3

def find_user_by_email_and_name(email, name):
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE email = ? AND name = ?', (email, name))
    user = cursor.fetchone()
    conn.close()
    return user

def add_user(name, email):
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (name, email) VALUES (?, ?)', (name, email))
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return user_id