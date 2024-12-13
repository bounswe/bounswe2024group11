from django.db import transaction, IntegrityError, models
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response
from .achievements.services import AchievementService
from .serializers.achievement import AchievementSerializer, UserAchievementSerializer
import json

class AchievementMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.method == 'POST' and request.user.is_authenticated:
            with transaction.atomic():
                try:
                    if response.status_code == 201:
                        if isinstance(response, Response):
                            user_achievement_created = AchievementService.handle_achievements(request.user)
                            if user_achievement_created:
                                user_achievement_data = UserAchievementSerializer(user_achievement_created).data
                                response.data['achievement'] = user_achievement_data
                            else:
                                response.data['achievement'] = None
                            response._is_rendered = False
                            response.render()
                        else:
                            # else part is recommended by copilot, but it is not tested
                            if user_achievement_created:
                                user_achievement_data = UserAchievementSerializer(user_achievement_created).data
                                response_content = json.loads(response.content.decode('utf-8'))
                                response_content['achievement'] = user_achievement_data
                                response.content = json.dumps(response_content)
                            else:
                                response_content = json.loads(response.content.decode('utf-8'))
                                response_content['achievement'] = None
                                response.content = json.dumps(response_content)

                except Exception as e:
                    print(e)
                    pass

        return response