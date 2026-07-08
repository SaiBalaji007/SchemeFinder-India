import os

import pandas as pd
from django.conf import settings
from django.core.management.base import BaseCommand

from schemes.models import Scheme


class Command(BaseCommand):
    help = "Import scheme data from all .xlsx files in the excel/ folder into the SQLite database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--folder",
            type=str,
            default=str(settings.BASE_DIR / "excel"),
            help="Folder containing the .xlsx scheme files (default: <project_root>/excel)",
        )

    def handle(self, *args, **options):
        excel_folder = options["folder"]

        if not os.path.isdir(excel_folder):
            self.stderr.write(self.style.ERROR(f"Folder not found: {excel_folder}"))
            return

        total_created = 0
        total_updated = 0

        for file in sorted(os.listdir(excel_folder)):
            if not file.endswith(".xlsx"):
                continue

            file_path = os.path.join(excel_folder, file)
            self.stdout.write(f"Importing {file}...")

            df = pd.read_excel(file_path)

            for _, row in df.iterrows():
                _, created = Scheme.objects.update_or_create(
                    scheme_id=row["Scheme ID"],
                    defaults={
                        "scheme_name": row["Scheme Name"],
                        "category": row["Category"],
                        "government_level": row["Government Level"],
                        "state": row["State"],
                        "target_beneficiaries": row["Target Beneficiaries"],
                        "gender": row["Gender"],
                        "minimum_age": None if pd.isna(row["Minimum Age"]) else int(row["Minimum Age"]),
                        "maximum_age": None if pd.isna(row["Maximum Age"]) else int(row["Maximum Age"]),
                        "annual_income_limit": "" if pd.isna(row["Annual Income Limit"]) else str(row["Annual Income Limit"]),
                        "education_required": "" if pd.isna(row["Education Required"]) else row["Education Required"],
                        "occupation": "" if pd.isna(row["Occupation"]) else row["Occupation"],
                        "caste_category": "" if pd.isna(row["Caste Category"]) else row["Caste Category"],
                        "disability_required": "" if pd.isna(row["Disability Required"]) else row["Disability Required"],
                        "required_documents": "" if pd.isna(row["Required Documents"]) else row["Required Documents"],
                        "benefits": "" if pd.isna(row["Benefits"]) else row["Benefits"],
                        "description": "" if pd.isna(row["Description"]) else row["Description"],
                        "application_mode": "" if pd.isna(row["Application Mode"]) else row["Application Mode"],
                        "official_website": "" if pd.isna(row["Official Website"]) else row["Official Website"],
                        "status": "" if pd.isna(row["Status"]) else row["Status"],
                    },
                )
                if created:
                    total_created += 1
                else:
                    total_updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {total_created} schemes created, {total_updated} schemes updated."
            )
        )
