from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schemes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheme',
            name='maximum_age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='scheme',
            name='minimum_age',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
