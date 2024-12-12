from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from core.models import CustomUser, Achievement, Tag, ForumBookmark, TakeQuiz
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileEndpointTests(APITestCase):
    
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
            full_name="Test User"
        )
        self.client.force_authenticate(user=self.user)

        # Create another user for testing other scenarios
        self.other_user = User.objects.create_user(
            username="otheruser",
            email="otheruser@example.com",
            password="otherpassword"
        )

        # URL for profile endpoint
        self.profile_url = reverse("user-profile", kwargs={"username": self.user.username})
        self.profile_update_url = reverse("user-profile", kwargs={"username": self.user.username})

    def test_get_profile_success(self):
        """Test retrieving a user's profile successfully."""
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.user.id)
        self.assertEqual(response.data["email"], self.user.email)

    def test_get_profile_not_found(self):
        """Test retrieving a profile that does not exist."""
        url = reverse("user-profile", kwargs={"username": "nonexistent"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["error"], "Not found")

    def test_update_own_profile_success(self):
        """Test updating the authenticated user's profile."""
        data = {"full_name": "Updated User", "avatar": "http://example.com/avatar.png"}
        response = self.client.patch(self.profile_update_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.full_name, data["full_name"])
        self.assertEqual(self.user.avatar, data["avatar"])

    def test_update_other_user_profile_forbidden(self):
        """Test that a user cannot update another user's profile."""
        url = reverse("user-profile", kwargs={"username": self.other_user.username})
        data = {"full_name": "Hacked Name"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_own_profile_success(self):
        """Test deleting the authenticated user's profile."""
        response = self.client.delete(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(username=self.user.username).exists())

    def test_delete_other_user_profile_forbidden(self):
        """Test that a user cannot delete another user's profile."""
        url = reverse("user-profile", kwargs={"username": self.other_user.username})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_achievements(self):
        """Test retrieving achievements of a user."""
        achievement = Achievement.objects.create(
            slug="test-achievement",
            title="Test Achievement",
            description="This is a test achievement."
        )
        self.user.achievements.add(achievement)

        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("achievements", response.data)
        self.assertEqual(len(response.data["achievements"]), 1)
        self.assertEqual(response.data["achievements"][0]["title"], achievement.title)

    def test_get_interests(self):
        """Test retrieving interests of a user."""
        tag = Tag.objects.create(name="Test Tag", linked_data_id="123", description="A test tag")
        self.user.interests.add(tag)

        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("interests", response.data)
        self.assertEqual(len(response.data["interests"]), 1)
        self.assertEqual(response.data["interests"][0]["name"], tag.name)

    def test_get_bookmarked_forums(self):
        """Test retrieving bookmarked forums of a user."""
        forum = ForumBookmark.objects.create(user=self.user, forum_question="Sample Question")

        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("bookmarked_forums", response.data)
        self.assertEqual(len(response.data["bookmarked_forums"]), 1)

    def test_get_score(self):
        """Test retrieving the user's total score."""
        TakeQuiz.objects.create(user=self.user, score=50)
        TakeQuiz.objects.create(user=self.user, score=75)

        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["score"], 125)

    def test_guest_user_cannot_access_profile(self):
        """Test that a guest user cannot access profile endpoints."""
        self.client.logout()
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["detail"], "Authentication credentials were not provided.")
