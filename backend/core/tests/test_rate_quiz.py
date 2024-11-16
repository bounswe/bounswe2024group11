from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import Quiz, QuizQuestion
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from .QuizSetup import QuizSetup


User = get_user_model()

class RateQuizTestCase(QuizSetup):

    def test_rate_quiz_for_the_first_time(self):
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=1, max=5)
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertIn("id", response.data)
        self.assertIn("rating", response.data)
        # get the average from the quiz endpoint
        response = self.client.get(reverse('quiz-list'), format='json')
        self.assertEqual(response.data["results"][0]["rating"]["score"], data["rating"])
        self.assertEqual(response.data["count"], 1)


    def test_rate_quiz_for_the_second_time(self):
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=1, max=5)
        }
        self.client.post(reverse('rate-quiz-list'), data, format='json')
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("quiz", response.data["quiz"])

    def test_rate_quiz_with_invalid_rating(self):
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=6, max=10)
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("rating", response.data)
    
    def test_rate_quiz_with_invalid_quiz(self):
        data = {
            "quiz": 999,
            "rating": Faker().random_int(min=1, max=5)
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("quiz", response.data)

    def test_rate_quiz_with_unauthenticated_user(self):

        self.client.credentials()
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=1, max=5)
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)

    def test_rate_quiz_patch(self):
        rating1 = Faker().random_int(min=1, max=5)
        rating2 = Faker().random_int(min=1, max=5)

        data = {
            "quiz": self.quiz.id,
            "rating": rating1
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["rating"], rating1)

        data = {
            "rating": rating2
        }
        response = self.client.patch(reverse('rate-quiz-detail', args=[response.data["id"]]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["rating"], rating2)

    def test_rate_quiz_delete(self):
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=1, max=5)
        }
        response = self.client.post(reverse('rate-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.delete(reverse('rate-quiz-detail', args=[response.data["id"]]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_rate_quiz_list(self):
        data = {
            "quiz": self.quiz.id,
            "rating": Faker().random_int(min=1, max=5)
        }
        self.client.post(reverse('rate-quiz-list'), data, format='json')
        response = self.client.get(reverse('rate-quiz-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)