from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create (or update) the default admin superuser for SchemeFinder."

    def handle(self, *args, **options):
        User = get_user_model()

        username = "admin"
        email = "admin@gmail.com"
        password = "Balaji@2006"

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email, "is_staff": True, "is_superuser": True},
        )

        # Make sure email/flags/password are correct even if the user already existed.
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f"Created superuser '{username}'."))
        else:
            self.stdout.write(self.style.SUCCESS(f"Updated existing superuser '{username}'."))
