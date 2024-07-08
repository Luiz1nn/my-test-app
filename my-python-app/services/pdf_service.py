from repositories.user_repository import find_user_by_email_and_name, add_user
from repositories.pdf_repository import add_pdf_upload, get_pdfs_by_user_id, get_pdfs_by_file_name, get_all_pdfs
from utils.pdf_utils import extract_pdf_info
import tempfile
import os
import base64

def upload_pdf_service(file, name, email):
    user = find_user_by_email_and_name(email, name)
    if user is None:
        user_id = add_user(name, email)
    else:
        user_id = user[0]

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        file.save(temp_file.name)
        filepath = temp_file.name

    pdf_info = extract_pdf_info(filepath, file.filename)
    os.remove(filepath)

    add_pdf_upload(user_id, pdf_info)

    response = {
        "name": name,
        "email": email,
        "pdf_info": {
            "file_name": pdf_info["file_name"],
            "file_size": pdf_info["file_size"],
            "total_words": pdf_info["total_words"],
            "most_common_word": pdf_info["most_common_word"],
            "word_frequency": pdf_info["word_frequency"],
            "text_content": pdf_info["text_content"],
            "total_images": pdf_info["total_images"],
            "images": pdf_info["image_base_64"],
        },
    }

    return response, 200

def get_user_pdfs_service(name, email):
    user = find_user_by_email_and_name(email, name)
    if user is None:
        return {"error": "User not found"}, 404

    user_id = user[0]
    uploads = get_pdfs_by_user_id(user_id)

    upload_list = []
    for upload in uploads:
        upload_list.append({
            "file_name": upload[2],
            "file_size": upload[3],
            "total_words": upload[4],
            "most_common_word": upload[5],
            "word_frequency": upload[6],
            "text_content": upload[7],
            "total_images": upload[8],
            "images": [base64.b64encode(open(path, 'rb').read()).decode('utf-8') for path in upload[9].split(',')]
        })

    return {"list_pdf": upload_list}, 200

def search_pdfs_service(name):
    if name:
        uploads = get_pdfs_by_file_name(name)
    else:
        uploads = get_all_pdfs()

    upload_list = []
    for upload in uploads:
        if not upload[9]:
            images = []
        else:
            images_paths = upload[9].split(',')
            images = []
            for path in images_paths:
                if path:
                    try:
                        with open(path, 'rb') as image_file:
                            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                            images.append(encoded_image)
                    except FileNotFoundError:
                        print(f"File not found: {path}")
                        continue

        upload_list.append({
            "file_name": upload[2],
            "file_size": upload[3],
            "total_words": upload[4],
            "most_common_word": upload[5],
            "word_frequency": upload[6],
            "text_content": upload[7],
            "total_images": upload[8],
            "images": images
        })

    return {"list_pdf": upload_list}, 200
