from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from core.models import Mute
from django.urls import reverse

class MuteViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.user3 = User.objects.create_user(username='user3', password='password3')

        self.mute1 = Mute.objects.create(muter=self.user1, muted=self.user2)

        self.create_url = reverse('mute-list')  # URL to create a new mute
        self.delete_url = reverse('mute-detail', args=[self.mute1.id])  # URL to delete the created mute

    def test_create_mute(self):
        self.client.login(username='user3', password='password3')
        data = {'muted': self.user2.id}
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Mute.objects.count(), 2)
        self.client.logout()

    def test_destroy_mute_by_authorized_user(self):
        self.client.login(username='user1', password='password1')
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Mute.objects.count(), 0)
        self.client.logout()

    def test_destroy_mute_by_unauthorized_user(self):
        self.client.login(username='user3', password='password3')
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Mute.objects.count(), 1)
        self.client.logout()
