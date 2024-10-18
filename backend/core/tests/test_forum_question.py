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
        self.forum_question = ForumQuestion.objects.create(title='Test Question', question='What is the meaning of life?',
                                                              tag='philosophy', author=self.user)
        self.client = APIClient()

class ForumQuestionTestCase(ForumQuestionSetup):
    
    def test_forum_question_creation(self):
        response = self.client.get(reverse('forum-question-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], self.forum_question.title)
        self.assertEqual(response.data[0]['question'], self.forum_question.question)
        self.assertEqual(response.data[0]['tag'], self.forum_question.tag)
        self.assertEqual(response.data[0]['author'], self.forum_question.author.id)

    def test_forum_question_update(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')

        response = self.client.put(reverse('forum-question-detail', args=[self.forum_question.id]),
                                   {'title': 'Updated Question', 'question': 'What is the meaning of life?', 'tag': 'philosophy'}
                                   )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Question')

    def test_forum_question_delete(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')
        self.client.delete(reverse('forum-question-detail', args=[self.forum_question.id]))

    def test_forum_question_list(self):
        ForumQuestion.objects.create(title='Test Question 2', question='What is the meaning of life?', tag='philosophy', author=self.user)
        ForumQuestion.objects.create(title='Test Question 3', question='What is the meaning of life?', tag='philosophy', author=self.user)
        response = self.client.get(reverse('forum-question-list'))
        self.assertEqual(len(response.data), 3)

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
        response = self.client.post(reverse('forum-question-list'), {'title': 'Test Question 2', 'question': 'What is the meaning of life?', 'tag': 'philosophy'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

