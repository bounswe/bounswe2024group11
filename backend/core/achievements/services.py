from ..models import Achievement, UserAchievement
from .conditions import SELF_ACHIEVEMENT_CONDITIONS, NON_SELF_ACHIEVEMENT_CONDITIONS

class AchievementNotFoundException(Exception):
    pass

class AchievementService:
    @staticmethod
    def handle_achievements(user):
        for achievement_slug, condition in SELF_ACHIEVEMENT_CONDITIONS.items():
            try:
                achievement = Achievement.objects.get(slug=achievement_slug)
                if condition(user) and not AchievementService.has_achievement(user, achievement):
                    # return the user achievement if it is initiated by the user himself
                    return AchievementService.award_achievement(user, achievement)
            except Achievement.DoesNotExist:
                raise AchievementNotFoundException(f'Achievement with slug "{achievement_slug}" does not exist.')
        for achievement_slug, condition in NON_SELF_ACHIEVEMENT_CONDITIONS.items():
            try:
                achievement = Achievement.objects.get(slug=achievement_slug)
                if condition(user) and not AchievementService.has_achievement(user, achievement):
                    # do NOT return the user achievement if it is initiated by the another user
                    AchievementService.award_achievement(user, achievement)
            except Achievement.DoesNotExist:
                raise AchievementNotFoundException(f'Achievement with slug "{achievement_slug}" does not exist.')
        return None
    
    @staticmethod
    def award_achievement(user, achievement):
        user_achievement = UserAchievement.objects.create(user=user, achievement=achievement)
        return user_achievement
    
    @staticmethod
    def has_achievement(user, achievement):
        return UserAchievement.objects.filter(user=user, achievement=achievement).exists()