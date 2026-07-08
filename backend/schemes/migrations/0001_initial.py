from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Scheme',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheme_id', models.CharField(max_length=50, unique=True)),
                ('scheme_name', models.CharField(max_length=255)),
                ('category', models.CharField(max_length=100)),
                ('government_level', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('target_beneficiaries', models.CharField(max_length=255)),
                ('gender', models.CharField(max_length=50)),
                ('minimum_age', models.IntegerField()),
                ('maximum_age', models.IntegerField()),
                ('annual_income_limit', models.CharField(max_length=100)),
                ('education_required', models.CharField(max_length=255)),
                ('occupation', models.CharField(max_length=255)),
                ('caste_category', models.CharField(max_length=100)),
                ('disability_required', models.CharField(max_length=100)),
                ('required_documents', models.TextField()),
                ('benefits', models.TextField()),
                ('description', models.TextField()),
                ('application_mode', models.CharField(max_length=100)),
                ('official_website', models.URLField()),
                ('status', models.CharField(max_length=50)),
            ],
        ),
    ]
