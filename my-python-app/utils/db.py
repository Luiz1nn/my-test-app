import sqlite3

def init_db():
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    
    # Criar tabela de usuários
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    ''')
    
    # Criar tabela de uploads de PDF
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS pdf_uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            file_name TEXT NOT NULL,
            file_size INTEGER NOT NULL,
            total_words INTEGER NOT NULL,
            most_common_word TEXT NOT NULL,
            word_frequency INTEGER NOT NULL,
            text_content TEXT NOT NULL,
            total_images INTEGER NOT NULL,
            images TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')
    
    conn.commit()
    conn.close()
