from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch, Mock

class SearchPostViewTests(APITestCase):
    def test_missing_parameters(self):
        url = reverse("search_posts")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('core.views.wikidata_helpers.born_in_wikidata')
    def test_born_in_category(self, mock_born_in_wikidata):
        mock_born_in_wikidata.return_value = Mock(data={"results": [{"qid": "Q12345"}]})
        
        url = reverse("search_posts")
        response = self.client.get(url, {"qid": "Q123", "category": "born in"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add more assertions based on your expected behavior
        
    # Write similar test methods for other categories like "enemy of", "occupation", etc.
    
    @patch('core.views.wikidata_helpers.born_in_wikidata')
    def test_unexpected_error(self, mock_born_in_wikidata):
        mock_born_in_wikidata.side_effect = Exception("Unexpected error")
        
        url = reverse("search_posts")
        response = self.client.get(url, {"qid": "Q123", "category": "born in"})
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Add more test methods to cover other scenarios and categories
