from .test_setup import TestSetUp
from django.urls import reverse
from faker import Faker

class TestView(TestSetUp):
    
    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data1, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], self.user_data1['username'])
        self.assertEqual(response.data['user']['email'], self.user_data1['email'])
        self.assertTrue('token' in response.data)

    def test_register_nonunique_username(self):
        response = self.client.post(self.register_url, self.user_data1, format='json')
        response = self.client.post(self.register_url, self.user_data1, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['username'][0], 'user with this username already exists.')

    def test_false_login_user(self):
        response = self.client.post(self.login_url, self.user_data1, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 404)

    def test_login_user(self):
        self.client.post(self.register_url, self.user_data1, format='json')
        response = self.client.post(self.login_url, self.user_data1, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], self.user_data1['username'])
        self.assertEqual(response.data['user']['email'], self.user_data1['email'])
        self.assertTrue('token' in response.data)

        