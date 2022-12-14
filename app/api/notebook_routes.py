from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from app.models import Notebook, Note, db
from app.forms import NotebookForm

notebook_routes = Blueprint("notebooks", __name__)


@notebook_routes.route("/")
@login_required
def get_all_notebooks():
    """
    Queries for all notebooks, and all associated data,
    and returns it in a list of dictionaries
    """

    notebooks = (
        Notebook.query.filter_by(user_id=current_user.get_id())
        # .order_by(Notebook.created_at.desc())
        .options(joinedload(Notebook.user), joinedload(Notebook.notes)).all()
    )

    response = {"Notebooks": []}

    for notebook in notebooks:
        notebook_dict = notebook.to_dict()
        notebook_dict["Notes"] = [note.to_dict() for note in notebook.notes]
        notebook_dict["User"] = notebook.user.to_dict()
        response["Notebooks"].append(notebook_dict)

    return response


@notebook_routes.route("/<int:id>/notes")
@login_required
def get_notebook_notes(id):
    """
    Queries for all notebooks, and all associated data,
    and returns it in a list of dictionaries
    """

    notes = (
        Note.query.filter_by(notebook_id=id)
        .options(joinedload(Note.user), joinedload(Note.notebook))
        .all()
    )

    response = {"Notes": []}

    for note in notes:
        note_dict = note.to_dict()
        response["Notes"].append(note_dict)

    return response


@notebook_routes.route("/default")
@login_required
def get_default_notebook():
    """
    Queries for the current users default notebook,
    and returns it as a dictionary
    """

    defaultNotebook = (
        Notebook.query.filter_by(user_id=current_user.get_id(), default=True)
        .options(joinedload(Notebook.user), joinedload(Notebook.notes))
        .one()
    )

    return defaultNotebook.to_dict()


@notebook_routes.route("/", methods=["POST"])
@login_required
def create_notebook():
    """
    Creates a notebook, validates the submission,
    and returns the new notebook in a dictionary
    """

    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_notebook = Notebook(
            user_id=current_user.get_id(),
            name=form.data["name"],
            default=form.data["default"],
        )
        new_notebook.set_created()
        db.session.add(new_notebook)
        db.session.commit()
        return new_notebook.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@notebook_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_notebook(id):
    """
    Edits an existing notebook. If the current notebook can't be found,
    or if current user does not own the notebook, returns an error message
    """

    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    try:
        current_notebook = Notebook.query.get_or_404(id)

    except:
        return {"message": "Notebook couldn't be found"}, 404

    else:
        if current_notebook.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403

        if form.validate_on_submit():
            if form.data["name"]:
                current_notebook.name = form.data["name"]
            current_notebook.set_updated()
            db.session.commit()
            return current_notebook.to_dict()

        return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@notebook_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_notebook(id):
    """
    Deletes an existing notebook. If the notebook does not exist, or if
    the notebook is not owned by current user, returns an error message
    """

    try:
        notebook_to_delete = Notebook.query.get_or_404(id)
    except:
        return {"message": "Notebook couldn't be found"}, 404
    else:
        if notebook_to_delete.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403
        db.session.delete(notebook_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}, 200
