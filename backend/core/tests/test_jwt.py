from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from faker import Faker

data = {
    'username': Faker().user_name(),
    'password': Faker().password(),
    'email': Faker().email(),
    'full_name': Faker().name()
}

User = get_user_model()

class UserRegistrationTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')  # Change this to your actual register URL name

    def test_user_registration(self):
        response = self.client.post(self.register_url, data, format='json')
        
        # Check that the response is successful
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

        # Check that the user was created in the database
        self.assertTrue(User.objects.filter(username=data["username"]).exists())

    def test_user_registration_existing_username(self):
        # Create the user first
        User.objects.create_user(username=data["username"], password=data["password"])

        response = self.client.post(self.register_url, data, format='json')

        # Check that the response indicates a conflict
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class TokenObtainPairTests(APITestCase):
    def setUp(self):
        self.token_url = reverse('token_obtain_pair')  # Change this to your actual token URL name
        self.user = User.objects.create_user(
            username=data["username"],
            password=data["password"]
        )

    def test_token_obtain_pair(self):
        response = self.client.post(self.token_url, data, format='json')

        # Check that the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response contains access and refresh tokens
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_token_obtain_pair_invalid_username(self):
        invalid_data = {
            "username": "wrongusername",
            "password": "wrongpassword"
        }
        response = self.client.post(self.token_url, invalid_data, format='json')

        # Check that the response indicates an unauthorized access
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_obtain_pair_invalid_password(self):
        invalid_data = {
            "username": data["username"],
            "password": "wrongpassword"
        }
        response = self.client.post(self.token_url, invalid_data, format='json')

        # Check that the response indicates an unauthorized access
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

