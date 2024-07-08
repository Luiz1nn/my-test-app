import sqlite3

def add_pdf_upload(user_id, pdf_info):
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO pdf_uploads (
            user_id, file_name, file_size, total_words, most_common_word,
            word_frequency, text_content, total_images, images
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id, pdf_info["file_name"], pdf_info["file_size"], pdf_info["total_words"],
        pdf_info["most_common_word"], pdf_info["word_frequency"], pdf_info["text_content"],
        pdf_info["total_images"], ','.join(pdf_info["image_path"])
    ))
    conn.commit()
    conn.close()

def get_pdfs_by_user_id(user_id):
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM pdf_uploads WHERE user_id = ?', (user_id,))
    uploads = cursor.fetchall()
    conn.close()
    return uploads

def get_pdfs_by_file_name(file_name):
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM pdf_uploads WHERE file_name LIKE ?', ('%' + file_name + '%',))
    uploads = cursor.fetchall()
    conn.close()
    return uploads

def get_all_pdfs():
    conn = sqlite3.connect('uploads.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM pdf_uploads')
    uploads = cursor.fetchall()
    conn.close()
    return uploads