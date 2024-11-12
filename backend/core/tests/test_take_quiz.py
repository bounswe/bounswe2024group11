from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import Quiz, QuizQuestion
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()

class TakeQuizSetup(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username=Faker().user_name(), password=Faker().password(),
                                             email=Faker().email(), full_name=Faker().name())
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')

        self.data = {
            "title": "What is Django?",
            "description": "A web framework.",
            "tags": [
                {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
                {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
            ],
            "type": 1,
            "questions": [
                {
                    "question_text": "What is Django?",
                    "choices": ["A web framework", "A programming language", "A database", "A server"],
                    "answer": "A web framework"
                }
            ]
        }

        self.client.post(reverse('quiz-list'), self.data, format='json')
        self.quiz = Quiz.objects.get(title='What is Django?')


class TakeQuizTestCase(TakeQuizSetup):

    def test_take_quiz_for_the_first_time(self):
        data = {
            "quiz_id": self.quiz.id,
            "rating": 3
        }
        print(data)
        response = self.client.post(reverse('take-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["author"]["username"], self.user.username)
        self.assertIn("id", response.data)
