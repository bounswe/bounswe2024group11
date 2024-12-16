from django.core.management.base import BaseCommand
from core.tasks import reset_leaderboard

class Command(BaseCommand):
    help = "Resets the leaderboard."

    def handle(self, *args, **kwargs):
        reset_leaderboard()  # Calling the reset from the tasks.py file
        self.stdout.write(self.style.SUCCESS("Leaderboard reset successfully!"))
