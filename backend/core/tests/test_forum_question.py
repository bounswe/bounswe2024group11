from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import ForumQuestion
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken



User = get_user_model()

class ForumQuestionSetup(APITestCase):
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


class ForumQuestionTestCase(ForumQuestionSetup):
    
    def test_forum_question_creation(self):
        data = {
            "title": "How to serialize ManyToMany relationships?",
            "question": "I need help with ManyToMany relationships in Django Rest Framework.",
            "tags": [
                {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
                {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
            ]
        }

        
        response = self.client.post(reverse('forum-question-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ForumQuestion.objects.count(), 2)
        self.assertEqual(ForumQuestion.objects.all()[1].title, data['title'])
        self.assertEqual(ForumQuestion.objects.all()[1].question, data['question'])
        self.assertEqual(ForumQuestion.objects.all()[1].tags.count(), 2)


    def test_forum_question_update(self):

        data = {
            "title": "New Title",
            "question": "I need help with ManyToMany relationships in Django Rest Framework.",
            "tags": [
                {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
                {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
            ]
        }

        response = self.client.put(reverse('forum-question-detail', args=[self.forum_question.id]),
                                   data, format='json'
                                   )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data['title'])

    def test_forum_question_delete(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.delete(reverse('forum-question-detail', args=[self.forum_question.id]))


    def test_user_cannot_modify_other_users_questions(self):
        user2 = User.objects.create_user(username=Faker().user_name(), password=Faker().password(),
                                         email=Faker().email(), full_name=Faker().name())
        refresh = RefreshToken.for_user(user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        response = self.client.put(reverse('forum-question-detail', args=[self.forum_question.id]),
                                   {'title': 'Updated Question', 'question': 'What is the meaning of life?', 'tag': 'philosophy'}
                                   )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(reverse('forum-question-detail', args=[self.forum_question.id]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unlogged_user_cannot_create_question(self):
        self.client.credentials()
        response = self.client.post(reverse('forum-question-list'), self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_forumQuestion_pagination(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        for i in range(20):
            ForumQuestion.objects.create(title=Faker().sentence(), question=Faker().sentence(), author=self.user)
        response = self.client.get(reverse('forum-question-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        self.assertEqual(response.data['count'], 21)
        self.assertEqual(len(response.data['results']), 10)
    


