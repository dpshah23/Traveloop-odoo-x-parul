from django.db import migrations


def add_column(cursor, table_name, column_name, column_sql):
    cursor.execute(f'PRAGMA table_info({table_name})')
    columns = {row[1] for row in cursor.fetchall()}
    if column_name not in columns:
        cursor.execute(f'ALTER TABLE {table_name} ADD COLUMN {column_sql}')


def forwards(apps, schema_editor):
    with schema_editor.connection.cursor() as cursor:
        add_column(cursor, 'packing_items', 'trip_stop_id', 'trip_stop_id char(32) NULL')
        add_column(cursor, 'packing_items', 'notes', 'notes TEXT NULL')
        add_column(cursor, 'packing_items', 'position', 'position smallint unsigned NOT NULL DEFAULT 0')

        add_column(cursor, 'trip_notes', 'is_public', 'is_public bool NOT NULL DEFAULT 0')
        add_column(cursor, 'trip_notes', 'created_by_id', 'created_by_id char(32) NULL')


def backwards(apps, schema_editor):
    # SQLite does not support dropping columns cleanly; keep this repair migration one-way.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0003_fix_tripstop_stop_notes_schema'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]