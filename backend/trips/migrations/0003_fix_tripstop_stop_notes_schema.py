from django.db import migrations


def forwards(apps, schema_editor):
    connection = schema_editor.connection
    table_name = 'trip_stops'

    with connection.cursor() as cursor:
        cursor.execute(f'PRAGMA table_info({table_name})')
        columns = {row[1] for row in cursor.fetchall()}

        if 'stop_notes' in columns:
            return

        cursor.execute(f'ALTER TABLE {table_name} ADD COLUMN stop_notes text NULL')

        if 'notes' in columns:
            cursor.execute(f'UPDATE {table_name} SET stop_notes = notes WHERE stop_notes IS NULL')


def backwards(apps, schema_editor):
    # SQLite cannot easily drop columns, so this migration is intentionally one-way.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0002_rename_notes_tripstop_stop_notes_tripnote_and_more'),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]