# from django.urls import reverse
# from rest_framework.test import APITestCase
# from rest_framework import status
# from unittest.mock import patch

# class WikidataSuggestionsViewTests(APITestCase):
#     def test_missing_keyword_parameter(self):
#         url = reverse("wikidata_suggestions")
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_invalid_qid(self):
#         url = reverse("wikidata_suggestions")
#         response = self.client.get(url, {"keyword": "apple"})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     @patch('requests.get')
#     def test_successful_request(self, mock_get):
#         mock_response = {
#             "search": [
#                 {
#                     "id": "Q12345",
#                     "label": "Apple",
#                     "description": "Fruit"
#                 }
#             ]
#         }
#         mock_get.return_value.status_code = 200
#         mock_get.return_value.json.return_value = mock_response

#         url = reverse("wikidata_suggestions")
#         response = self.client.get(url, {"keyword": "apple"})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data[0]['qid'], "Q12345")

#     @patch('requests.get')
#     def test_failed_request(self, mock_get):
#         mock_get.return_value.status_code = 500

#         url = reverse("wikidata_suggestions")
#         response = self.client.get(url, {"keyword": "apple"})
#         self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
