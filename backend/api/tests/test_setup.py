from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse('signup')
        self.login_url = reverse('login')


        self.user_data1 = {
            'username': Faker().user_name(),
            'email': Faker().email(),
            'password': Faker().password(),
            'fullname': Faker().name(),
        }
        
        self.user_data2 = {
            'username': Faker().user_name(),
            'email': Faker().email(),
            'password': Faker().password(),
            'fullname': Faker().name(),
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()   