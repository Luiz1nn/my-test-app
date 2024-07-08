import fitz
import os
import base64
import html
import uuid

def extract_pdf_info(pdf_path, file_name):
    doc = fitz.open(pdf_path)
    text = ""
    images = []
    imagesBase64 = []
    word_count = 0
    word_freq = {}

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()

        for img in page.get_images(full=True):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            imagesBase64.append(image_base64)
            image_id = str(uuid.uuid4())
            image_path = os.path.join('uploads', f"{image_id}.png")
            with open(image_path, 'wb') as img_file:
                img_file.write(image_bytes)
            images.append(image_path)

    words = text.split()
    word_count = len(words)

    for word in words:
        word_freq[word] = word_freq.get(word, 0) + 1

    if word_freq:
        most_common_word = max(word_freq, key=word_freq.get)
        most_common_word_freq = word_freq[most_common_word]
    else:
        most_common_word = ""
        most_common_word_freq = 0


    text_content_utf8 = text.encode('utf-8')
    text_content_html = html.escape(text_content_utf8.decode('utf-8')).replace('\n', ' ')

    return {
        "file_name": file_name,
        "file_size": os.path.getsize(pdf_path),
        "total_words": word_count,
        "most_common_word": most_common_word,
        "word_frequency": most_common_word_freq,
        "text_content": text_content_html,
        "total_images": len(images),
        "image_base_64": imagesBase64,
        "image_path": images
    }
