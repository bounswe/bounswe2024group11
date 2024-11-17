from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import ForumQuestion, ForumAnswer
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
        

class ForumAnswerSetup(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username=Faker().user_name(), password=Faker().password(),
                                             email=Faker().email(), full_name=Faker().name())
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        self.data = {
            "title": "How to serialize ManyToMany relationships?",
            "question": "I need help with ManyToMany relationships in Django Rest Framework.",
            "tags": [
                {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
                {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
            ]
        }
        self.client.post(reverse('forum-question-list'), self.data, format='json')
        self.forum_question = ForumQuestion.objects.get(title='How to serialize ManyToMany relationships?')

        self.data = {
            "answer": "You can use the serializers.ModelSerializer and set the many=True parameter.",
        }
        self.client.post(reverse('forum-answer-list', args=[self.forum_question.id]), self.data, format='json')
        self.forum_answer = ForumAnswer.objects.get(answer='You can use the serializers.ModelSerializer and set the many=True parameter.')

class ForumAnswerTestCase(ForumAnswerSetup):
           
    def test_forum_answer_creation(self):
        data = {
            "answer": "You can use the serializers.ModelSerializer and set the many=True parameter.",
        }
        response = self.client.post(reverse('forum-answer-list', args=[self.forum_question.id]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ForumAnswer.objects.count(), 2)
        self.assertEqual(ForumAnswer.objects.all()[1].answer, data['answer'])
        self.assertEqual(ForumAnswer.objects.all()[1].forum_question, self.forum_question)

    def test_forum_answer_update(self):
        data = {
            "answer": "You can use the serializers.ModelSerializer and set the many=True parameter.",
        }
        response = self.client.put(reverse('forum-answer-detail', args=[self.forum_question.id, self.forum_answer.id]),
                                data, format='json'
                                )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['answer'], data['answer'])

    def test_forum_answer_delete(self):
        response = self.client.delete(reverse('forum-answer-detail', args=[self.forum_question.id, self.forum_answer.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_user_cannot_modify_other_users_answers(self):
        user2 = User.objects.create_user(username=Faker().user_name(), password=Faker().password(),
                                        email=Faker().email(), full_name=Faker().name())
        refresh = RefreshToken.for_user(user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        response = self.client.put(reverse('forum-answer-detail', args=[self.forum_question.id, self.forum_answer.id]),
                                {'answer': 'Updated Answer'}
                                )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(reverse('forum-answer-detail', args=[self.forum_question.id, self.forum_answer.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unlogged_user_cannot_create_answer(self):
        self.client.credentials()
        response = self.client.post(reverse('forum-answer-list', args=[self.forum_question.id]), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_forumAnswer_pagination(self):
        refresh = RefreshToken.for_user(self.user)