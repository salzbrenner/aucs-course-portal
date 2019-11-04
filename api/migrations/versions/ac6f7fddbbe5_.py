"""empty message

Revision ID: ac6f7fddbbe5
Revises: cabecda8158f
Create Date: 2019-11-02 17:33:30.839912

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ac6f7fddbbe5"
down_revision = "cabecda8158f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("unique_quality", "quality", type_="unique")
    op.create_unique_constraint("unique_quality", "quality", ["id", "cid", "user_id"])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("unique_quality", "quality", type_="unique")
    op.create_unique_constraint("unique_quality", "quality", ["cid", "user_id"])
    # ### end Alembic commands ###
