from rest_framework.test import APITestCase
from django.urls import reverse

class TestSetUp(APITestCase):
    def setUp(self):
        self.get_users_url = reverse('get_users')
        self.add_user_url = reverse('add_user')
        self.update_user_url = reverse('update_user', kwargs={'pk': 1})
        self.delete_user_url = reverse('delete_user', kwargs={'pk': 1})

        self.user_data = {
            'email': 'email@gmail.com',
            'username': 'username',
            'name': 'name',
            "surname": "surname",
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()   