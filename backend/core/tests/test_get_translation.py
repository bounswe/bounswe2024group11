from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

class TranslationViewTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('get-translation')

    @patch('core.views.get_translation_views.requests.get')
    def test_get_translation_success_type1(self, mock_get):
        # Arrange
        mock_response_data = {
            'senses': [
                {'properties': {'language': 'TR', 'fullLemma': 'deneme'}},
                {'properties': {'language': 'TR', 'fullLemma': 'örnek'}}
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response_data

        # Act
        response = self.client.get(self.url, {'type': 'type1', 'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'translations': ['deneme', 'örnek']})
        mock_get.assert_called_once()
        args, kwargs = mock_get.call_args
        self.assertIn('params', kwargs)
        self.assertEqual(kwargs['params']['id'], 'bn:00000000n')
        self.assertEqual(kwargs['params']['targetLang'], 'TR')

    @patch('core.views.get_translation_views.requests.get')
    def test_get_translation_success_type2(self, mock_get):
        # Arrange
        mock_response_data = {
            'senses': [
                {'properties': {'language': 'EN', 'fullLemma': 'test'}},
                {'properties': {'language': 'EN', 'fullLemma': 'example'}}
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response_data

        # Act
        response = self.client.get(self.url, {'type': 'type2', 'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'translations': ['test', 'example']})
        mock_get.assert_called_once()
        args, kwargs = mock_get.call_args
        self.assertEqual(kwargs['params']['targetLang'], 'EN')

    def test_get_translation_missing_type(self):
        # Act
        response = self.client.get(self.url, {'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Parameters "type" and "id" are required.'})

    def test_get_translation_missing_id(self):
        # Act
        response = self.client.get(self.url, {'type': 'type1'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Parameters "type" and "id" are required.'})

    def test_get_translation_invalid_type(self):
        # Act
        response = self.client.get(self.url, {'type': 'invalid_type', 'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'error': 'Invalid type parameter. Must be "type1" or "type2".'})

    @patch('core.views.get_translation_views.requests.get')
    def test_get_translation_no_translations_found(self, mock_get):
        # Arrange
        mock_response_data = {'senses': []}
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response_data

        # Act
        response = self.client.get(self.url, {'type': 'type1', 'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'error': 'No translations found.'})

    @patch('core.views.get_translation_views.requests.get')
    def test_get_translation_babelnet_api_error(self, mock_get):
        # Arrange
        mock_get.return_value.status_code = 500
        mock_get.return_value.json.return_value = {}

        # Act
        response = self.client.get(self.url, {'type': 'type1', 'id': '00000000n'})

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

