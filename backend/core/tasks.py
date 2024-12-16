from .models import CustomUser

def reset_leaderboard():
    """
    Resets the leaderboard by setting all scores to 0.
    """
    CustomUser.objects.update(score=0)  
