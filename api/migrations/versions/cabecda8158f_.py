"""empty message

Revision ID: cabecda8158f
Revises: 7062c47ffeba
Create Date: 2019-11-01 13:20:00.403044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cabecda8158f"
down_revision = "7062c47ffeba"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, "course", ["cid"])
    op.drop_column("user", "internal_id")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "user",
        sa.Column("internal_id", sa.INTEGER(), autoincrement=False, nullable=False),
    )
    op.drop_constraint(None, "course", type_="unique")
    # ### end Alembic commands ###