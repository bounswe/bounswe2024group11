from django.contrib.auth import get_user_model
from django.urls import reverse
from faker import Faker
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Quiz, QuizQuestion

User = get_user_model()

class QuizSetup(APITestCase):
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
                    "choices": [
                        {
                            "choice_text": "A web framework",
                            "is_correct": True
                        }, 
                        {
                            "choice_text": "A programming language",
                            "is_correct": False
                        }, 
                        {
                            "choice_text": "A database",
                            "is_correct": False
                        }, 
                        {
                            "choice_text": "A server",
                            "is_correct": False
                        }
                    ],
                }
            ]
        }

        self.client.post(reverse('quiz-list'), self.data, format='json')
        self.quiz = Quiz.objects.get(title='What is Django?')
    
class QuizTestCase(QuizSetup):

    def test_quiz_creation(self):
        response = self.client.post(reverse('quiz-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['author']["username"], self.user.username)
        self.assertIn('difficulty', response.data)
        self.assertEqual(response.data["title"], self.data['title'])
        self.assertEqual(response.data["description"], self.data['description'])
        self.assertDictEqual(response.data["tags"][0], self.data['tags'][0])
        self.assertEqual(response.data["questions"][0]["question_text"], self.data['questions'][0]['question_text'])
        self.assertEqual(response.data["questions"][0]["choices"][0]["choice_text"], self.data['questions'][0]['choices'][0]['choice_text'])
        self.assertEqual(response.data["rating"]["score"], None)
        self.assertEqual(response.data["rating"]["count"], 0)

    
    def test_quiz_update(self):
        data = {
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
                    "choices": [
                        {
                            "choice_text": "A web framework",
                            "is_correct": True
                        }, 
                        {
                            "choice_text": "A programming language",
                            "is_correct": False
                        }, 
                        {
                            "choice_text": "A database",
                            "is_correct": False
                        }, 
                        {
                            "choice_text": "A server",
                            "is_correct": False
                        }
                    ],
                }
            ]
        }

        response = self.client.put(reverse('quiz-detail', args=[self.quiz.id]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['description'], data['description'])
        self.assertDictEqual(response.data['tags'][0], data['tags'][0])
        self.assertEqual(response.data['questions'][0]['question_text'], data['questions'][0]['question_text'])
        self.assertEqual(response.data["author"]["username"], self.user.username)

    def test_quiz_delete(self):
        response = self.client.delete(reverse('quiz-detail', args=[self.quiz.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_non_author_cannot_modify_quiz(self):
        user2 = User.objects.create_user(username=Faker().user_name(), password=Faker().password(),
                                         email=Faker().email(), full_name=Faker().name())
        refresh = RefreshToken.for_user(user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        response = self.client.put(reverse('quiz-detail', args=[self.quiz.id]), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'You do not have permission to perform this action.')

    def test_guest_user_cannot_create_quiz(self):
        self.client.credentials()
        response = self.client.post(reverse('quiz-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], 'Authentication credentials were not provided.')

    def test_list_quizzes(self):
        response = self.client.get(reverse('quiz-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]['title'], self.data['title'])