from django.urls import reverse
from rest_framework.test import APITestCase

class WikiInfoViewTestCase(APITestCase):
    def test_wiki_info_view_with_valid_qid(self):
        # Sending a GET request to the endpoint with a valid QID
        response = self.client.get(reverse('info'), {'qid': 'Q2695156'})

        # Asserting that the response status code is 200
        self.assertEqual(response.status_code, 200)

        # Asserting that the response contains the keyword 'results'
        self.assertIn('results', response.data)

        # Asserting that the response contains the keyword 'keyword' with the correct QID
        self.assertEqual(response.data['keyword'], 'Q2695156')

        # Asserting that the response contains data for the 'results' key
        results = response.data['results']
        self.assertIsInstance(results, list)
        self.assertGreater(len(results), 0)  # Asserting that results list is not empty

        # Asserting the structure of each result item
        for result in results:
            self.assertIn('Inception', result)
            self.assertIn('Gender', result)
            self.assertIn('Birth Name', result)
            self.assertIn('Place of Birth', result)
            self.assertIn('Image', result)
            self.assertIn('Description', result)
            self.assertIn('Label', result)

    def test_wiki_info_view_with_invalid_qid(self):
        # Sending a GET request to the endpoint with an invalid QID
        response = self.client.get(reverse('info'), {'qid': 'invalid_qid'})

        # Asserting that the response status code is 404
        self.assertEqual(response.status_code, 400)

        # Asserting that the response contains the keyword 'res' with the error message
        self.assertIn('res', response.data)
        self.assertEqual(response.data['res'], 'QID should start with "Q".')

    def test_wiki_info_view_without_qid(self):
        # Sending a GET request to the endpoint without a QID
        response = self.client.get(reverse('info'))

        # Asserting that the response status code is 400
        self.assertEqual(response.status_code, 400)

        # Asserting that the response contains the keyword 'res' with the error message
        self.assertIn('res', response.data)
        self.assertEqual(response.data['res'], 'Parameter "qid" is required.')