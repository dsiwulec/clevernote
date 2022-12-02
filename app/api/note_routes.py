from flask import Blueprint, request
from flask_login import current_user, login_required
import datetime
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from app.models import Note, db
from app.forms import NoteForm

note_routes = Blueprint("notes", __name__)


@note_routes.route("/")
@login_required
def get_all_notes():
    """
    Queries for all notes, and all associated data,
    and returns it in a list of dictionaries
    """

    notes = (
        Note.query.filter_by(user_id=current_user.get_id())
        .options(joinedload(Note.user), joinedload(Note.notebook))
        .all()
    )

    response = {"Notes": []}

    for note in notes:
        note_dict = note.to_dict()
        response["Notes"].append(note_dict)

    return response


@note_routes.route("/", methods=["POST"])
@login_required
def create_note():
    """
    Creates a note, validates the submission,
    and returns the new note in a dictionary
    """

    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_note = Note(
            user_id=current_user.get_id(),
            title=form.data["title"],
            text=form.data["text"],
            notebook_id=form.data["notebookId"],
        )
        new_note.set_created()
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@note_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_note(id):
    """
    Edits an existing note. If the current note can't be found,
    or if current user does not own the note, returns an error message
    """

    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    try:
        current_note = Note.query.get_or_404(id)

    except:
        return {"message": "Note couldn't be found"}, 404

    else:
        if current_note.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403

        if form.validate_on_submit():
            if form.data["notebookId"]:
                current_note.notebook_id = form.data["notebookId"]
            if form.data["title"]:
                current_note.title = form.data["title"]
            if form.data["text"]:
                current_note.text = form.data["text"]
            current_note.set_updated()
            db.session.commit()
            return current_note.to_dict()

        return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_note(id):
    """
    Deletes an existing note. If the note does not exist, or if
    the note is not owned by current user, returns an error message
    """

    try:
        note_to_delete = Note.query.get_or_404(id)
    except:
        return {"message": "Post couldn't be found"}, 404
    else:
        if note_to_delete.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403
        db.session.delete(note_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}, 200
