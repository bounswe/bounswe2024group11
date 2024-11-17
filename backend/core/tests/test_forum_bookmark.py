from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from faker import Faker
from core.models import ForumBookmark, ForumQuestion
from django.contrib.auth import get_user_model

User = get_user_model()
fake = Faker()


class ForumBookmarkAPITest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username=fake.user_name(),
            password="testpassword",
            email=fake.email(),
            full_name=fake.name()
        )

        # Authenticate the test client
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(refresh.access_token)}')

        # Create a ForumQuestion
        self.forum_question = ForumQuestion.objects.create(
            title="Test Forum Question",
            question="This is a test question for bookmarks.",
            author=self.user
        )

        # Bookmark data
        self.data = {"forum_question": self.forum_question.id}

        # Create a ForumBookmark
        self.client.post(reverse('forumbookmark-list'), self.data, format='json')
        self.forum_bookmark = ForumBookmark.objects.get(user=self.user, forum_question=self.forum_question)

    def test_create_forum_bookmark(self):
        """Test creating a forum bookmark"""
        # Delete the existing bookmark to test creation
        self.forum_bookmark.delete()
        response = self.client.get(reverse('forum-question-detail', args=[self.forum_question.id]), format='json')
        self.assertFalse(response.data['is_bookmarked']) 
        # Send POST request to create a new bookmark
        response = self.client.post(reverse('forumbookmark-list'), self.data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ForumBookmark.objects.filter(user=self.user, forum_question=self.forum_question).exists())

        response = self.client.get(reverse('forum-question-detail', args=[self.forum_question.id]), format='json')
        self.assertTrue(response.data['is_bookmarked'])


    def test_delete_forum_bookmark(self):
        """Test deleting a forum bookmark"""
        # Send DELETE request to remove the bookmark
        self.assertTrue(self.client.get(reverse('forum-question-detail', args=[self.forum_question.id]), format='json').data['is_bookmarked'])
        response = self.client.delete(reverse('forumbookmark-detail', args=[self.forum_bookmark.id]))
        # Assertions
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(ForumBookmark.objects.filter(id=self.forum_bookmark.id).exists())
        self.assertFalse(self.client.get(reverse('forum-question-detail', args=[self.forum_question.id]), format='json').data['is_bookmarked'])

    def test_cannot_bookmark_same_forum_question_twice(self):
        """Test that the same forum question cannot be bookmarked twice"""
        # Attempt to create a duplicate bookmark
        response = self.client.post(reverse('forumbookmark-list'), self.data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            ForumBookmark.objects.filter(user=self.user, forum_question=self.forum_question).count(),
            1  # Ensure only one bookmark exists
        )

    def test_cannot_delete_other_users_bookmark(self):
        """Test that a user cannot delete another user's bookmark"""
        # Create another user and their bookmark
        other_user = User.objects.create_user(
            username="otheruser",
            password="otherpassword",
            email="otheruser@example.com",
            full_name="Other User"
        )
        other_bookmark = ForumBookmark.objects.create(user=other_user, forum_question=self.forum_question)

        # Attempt to delete the other user's bookmark
        response = self.client.delete(reverse('forumbookmark-detail', args=[other_bookmark.id]))

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(ForumBookmark.objects.filter(id=other_bookmark.id).exists())
