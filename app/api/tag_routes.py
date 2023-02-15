from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages
from app.models import Tag, db
from app.forms import TagForm

tag_routes = Blueprint("tags", __name__)


@tag_routes.route("/")
@login_required
def get_all_tags():
    """
    Queries for all tags, and all associated data,
    and returns it in a list of dictionaries
    """

    tags = (
        Tag.query.filter_by(user_id=current_user.get_id())
        .options(joinedload(Tag.notes))
        .all()
    )

    response = {"Tags": []}

    for tag in tags:
        tag_dict = tag.to_dict()
        tag_dict["Notes"] = [note.to_dict() for note in tag.notes]
        response["Tags"].append(tag_dict)

    return response


@tag_routes.route("/", methods=["POST"])
@login_required
def create_tag():
    """
    Creates a tag, validates the submission,
    and returns the new tag in a dictionary
    """

    form = TagForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_tag = Tag(
            user_id=current_user.get_id(),
            tag=form.data["tag"],
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict(), 201

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@tag_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_tag(id):
    """
    Edits an existing tag. If the current tag can't be found,
    or if current user does not own the tag, returns an error message
    """

    form = TagForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    try:
        current_tag = Tag.query.get_or_404(id)
        print(current_tag)

    except:
        return {"message": "Tag couldn't be found"}, 404

    else:
        if current_tag.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403

        if form.validate_on_submit():
            if form.data["tag"]:
                current_tag.tag = form.data["tag"]
            db.session.commit()
            return current_tag.to_dict()

        return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@tag_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_tag(id):
    """
    Deletes an existing tag. If the tag does not exist, or if
    the tag is not owned by current user, returns an error message
    """

    try:
        tag_to_delete = Tag.query.get_or_404(id)
    except:
        return {"message": "Tag couldn't be found"}, 404
    else:
        if tag_to_delete.user_id != int(current_user.get_id()):
            return {"message": "Forbidden"}, 403
        db.session.delete(tag_to_delete)
        db.session.commit()
        return {"message": "Successfully deleted"}, 200
