from .test_setup import TestSetUp
from django.urls import reverse
from faker import Faker

class TestView(TestSetUp):
    
    
    def test_add_user(self):

        response = self.client.post(self.add_user_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], self.user_data['email'])
        self.assertEqual(response.data['username'], self.user_data['username'])
        self.assertEqual(response.data['name'], self.user_data['name'])
        self.assertEqual(response.data['surname'], self.user_data['surname'])

    
    def test_get_users(self):
        self.client.post(self.add_user_url, self.user_data, format='json')

        response = self.client.get(self.get_users_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[-1]['email'], self.user_data['email'])
        self.assertEqual(response.data[-1]['username'], self.user_data['username'])
        self.assertEqual(response.data[-1]['name'], self.user_data['name'])
        self.assertEqual(response.data[-1]['surname'], self.user_data['surname'])

    def test_update_user(self):
        response = self.client.post(self.add_user_url, self.user_data, format='json')
        self.update_user_url = reverse('update_user', kwargs={'pk': response.data['id']})
        self.user_data['email'] = Faker().email()
        self.user_data['username'] = Faker().user_name()
        self.user_data['name'] = Faker().first_name()
        self.user_data['surname'] = Faker().last_name()

        response = self.client.put(self.update_user_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], self.user_data['username'])
        self.assertEqual(response.data['email'], self.user_data['email'])
        self.assertEqual(response.data['name'], self.user_data['name'])
        self.assertEqual(response.data['surname'], self.user_data['surname'])