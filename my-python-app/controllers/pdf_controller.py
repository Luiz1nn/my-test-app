from flask import Blueprint, request, jsonify
from services.pdf_service import upload_pdf_service, get_user_pdfs_service, search_pdfs_service

bp = Blueprint('pdf_controller', __name__)

@bp.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    file = request.files.get('file')
    name = request.form.get('name')
    email = request.form.get('email')

    if not file or not name or not email:
        return jsonify({"error": "File, name, and email are required"}), 400

    response, status = upload_pdf_service(file, name, email)
    return jsonify(response), status

@bp.route('/my-pdf', methods=['GET'])
def my_pdf():
    name = request.args.get('name')
    email = request.args.get('email')

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    response, status = get_user_pdfs_service(name, email)
    return jsonify(response), status

@bp.route('/search-pdf', methods=['GET'])
def search_pdf():
    name = request.args.get('name')

    response, status = search_pdfs_service(name)
    return jsonify(response), status