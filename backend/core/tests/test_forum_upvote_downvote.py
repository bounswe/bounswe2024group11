from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from faker import Faker
from core.models import ForumUpvote, ForumQuestion
from django.contrib.auth import get_user_model

User = get_user_model()
fake = Faker()


class ForumUpvoteAPITest(APITestCase):
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
            question="This is a test question for votes.",
            author=self.user
        )

        # Vote data
        self.data = {"forum_question": self.forum_question.id}  

    def test_create_forum_vote(self):
        """Test creating a forum vote"""
        # Send POST request to create a new vote
        response = self.client.post(reverse('forum-upvote-list'), self.data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ForumUpvote.objects.filter(user=self.user, forum_question=self.forum_question).exists())
        self.assertIn("id", response.data)
        self.assertIn("user", response.data)
        self.assertIn("forum_question", response.data)

    def test_delete_forum_vote(self):
        """Test deleting a forum vote"""
        # Create a vote to delete
        self.client.post(reverse('forum-upvote-list'), self.data, format='json')
        forum_vote = ForumUpvote.objects.get(user=self.user, forum_question=self.forum_question)

        # Send DELETE request to remove the vote
        response = self.client.delete(reverse('forum-upvote-detail', args=[forum_vote.id]))

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(ForumUpvote.objects.filter(id=forum_vote.id).exists())

    def test_cannot_vote_same_forum_question_twice(self):
        """Test that the same forum question cannot be voted twice"""
        # Create the first vote
        self.client.post(reverse('forum-upvote-list'), self.data, format='json')

        # Attempt to create a duplicate vote
        response = self.client.post(reverse('forum-upvote-list'), self.data, format='json')

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            ForumUpvote.objects.filter(user=self.user, forum_question=self.forum_question).count(),
            1  # Ensure only one vote exists
        )

    def test_cannot_delete_other_users_vote(self):
        """Test that a user cannot delete another user's vote"""
        # Create another user and their vote
        other_user = User.objects.create_user(
            username="otheruser",
            password="otherpassword",
            email="otheruser@example.com",
            full_name="Other User"
        )
        other_vote = ForumUpvote.objects.create(user=other_user, forum_question=self.forum_question)

        # Attempt to delete the other user's vote
        response = self.client.delete(reverse('forum-upvote-detail', args=[other_vote.id]))

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(ForumUpvote.objects.filter(id=other_vote.id).exists())

    def test_get_list_upvote_pagination(self):
        """Test that the upvotes are paginated"""
        # Create 15 upvotes
        # for _ in range(15):
        ForumUpvote.objects.create(user=self.user, forum_question=self.forum_question)

        # Send GET request to retrieve the upvotes
        response = self.client.get(reverse('forum-upvote-list'))

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("count", response.data)
        self.assertIn("next", response.data)
        self.assertIn("previous", response.data)
        self.assertIn("results", response.data)
        self.assertIn("id", response.data['results'][0])
        self.assertIn("user", response.data['results'][0])
        self.assertIn("forum_question", response.data['results'][0])
        self.assertIn("created_at", response.data['results'][0])
