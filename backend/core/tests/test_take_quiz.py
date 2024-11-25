from rest_framework import status
from django.urls import reverse
from ..models import Quiz, QuizQuestion, QuizQuestionChoice, TakeQuiz, UserAnswer
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from .QuizSetup import QuizSetup


User = get_user_model()

class TakeQuizTestCase(QuizSetup):
    
    def test_take_quiz(self):
        data = {
            "quiz": self.quiz.id,
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.first().id
                }
            ]
        }
        response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["is_taken"])
        self.assertEqual(response.data["num_taken"], 0)

        response = self.client.post(reverse('take-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["quiz"], self.quiz.id)
        self.assertIn("id", response.data)
        self.assertIn("date", response.data)
        self.assertEqual(response.data["answers"][0]["question"], data["answers"][0]["question"])
        self.assertEqual(response.data["answers"][0]["answer"], data["answers"][0]["answer"])
        response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["is_taken"])
        self.assertEqual(response.data["num_taken"], 1)

    # def test_take_quiz_already_taken(self):
    #     response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertFalse(response.data["is_taken"])
    #     self.assertEqual(response.data["num_taken"], 0)

    #     data = {
    #         "quiz": self.quiz.id,
    #         "answers": [
    #             {
    #                 "question": self.quiz.questions.first().id,
    #                 "answer": self.quiz.questions.first().choices.first().id
    #             }
    #         ]
    #     }
    #     self.client.post(reverse('take-quiz-list'), data, format='json')
    #     response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertTrue(response.data["is_taken"])
    #     self.assertEqual(response.data["num_taken"], 1)

    #     response = self.client.post(reverse('take-quiz-list'), data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data[0], "You have already taken this quiz.")
    #     response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertTrue(response.data["is_taken"])
    #     self.assertEqual(response.data["num_taken"], 1)

    # def test_take_quiz_invalid_answer(self):
    
    #     data_question = {
    #         "title": "Second Question",
    #         "description": "A web framework.",
    #         "tags": [
    #             {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
    #             {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
    #         ],
    #         "type": 1,
    #         "questions": [
    #             {
    #                 "question_text": "What is Django?",
    #                 "choices": [
    #                     {
    #                         "choice_text": "A web framework",
    #                         "is_correct": True
    #                     }, 
    #                     {
    #                         "choice_text": "A programming language",
    #                         "is_correct": False
    #                     }, 
    #                     {
    #                         "choice_text": "A database",
    #                         "is_correct": False
    #                     }, 
    #                     {
    #                         "choice_text": "A server",
    #                         "is_correct": False
    #                     }
    #                 ],
    #             }
    #         ]
    #     }

    #     self.client.post(reverse('quiz-list'), data_question, format='json')
    #     quiz = Quiz.objects.get(title='Second Question')

    #     data = {
    #         "quiz": self.quiz.id,
    #         "answers": [
    #             {
    #                 "question": self.quiz.questions.first().id,
    #                 "answer": quiz.questions.first().choices.last().id
    #             }
    #         ]
    #     }
    #     response = self.client.post(reverse('take-quiz-list'), data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(
    #         str(response.data[0]),
    #         "['The answer must belong to the same question.']"
    #     )
    #     response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertFalse(response.data["is_taken"])


    # def test_take_quiz_invalid_question(self):
    #     data_question = {
    #         "title": "Second Question",
    #         "description": "A web framework.",
    #         "tags": [
    #             {"name": "Django", "linked_data_id": "123", "description": "A web framework."},
    #             {"name": "DRF", "linked_data_id": "456", "description": "Django Rest Framework."}
    #         ],
    #         "type": 1,
    #         "questions": [
    #             {
    #                 "question_text": "What is Django?",
    #                 "choices": [
    #                     {
    #                         "choice_text": "A web framework",
    #                         "is_correct": True
    #                     }, 
    #                     {
    #                         "choice_text": "A programming language",
    #                         "is_correct": False
    #                     }, 
    #                     {
    #                         "choice_text": "A database",
    #                         "is_correct": False
    #                     }, 
    #                     {
    #                         "choice_text": "A server",
    #                         "is_correct": False
    #                     }
    #                 ],
    #             }
    #         ]
    #     }

    #     self.client.post(reverse('quiz-list'), data_question, format='json')
    #     quiz = Quiz.objects.get(title='Second Question')

    #     data = {
    #         "quiz": self.quiz.id,
    #         "answers": [
    #             {
    #                 "question": quiz.questions.last().id,
    #                 "answer": quiz.questions.first().choices.first().id
    #             }
    #         ]
    #     }
    #     response = self.client.post(reverse('take-quiz-list'), data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(
    #         str(response.data[0]),
    #         "['The question must belong to the same quiz.']"
    #     )
    #     response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertFalse(response.data["is_taken"])
    #     self.assertEqual(response.data["num_taken"], 0)


    def test_take_quiz_delete(self):

        response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["is_taken"])
        self.assertEqual(response.data["num_taken"], 0)

        data = {
            "quiz": self.quiz.id,
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.first().id
                }
            ]
        }
        response = self.client.post(reverse('take-quiz-list'), data, format='json')
        response_id = response.data['id']
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["is_taken"])
        self.assertEqual(response.data["num_taken"], 1)

        response = self.client.delete(reverse('take-quiz-detail', kwargs={'pk': response_id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(reverse('quiz-detail', kwargs={'pk': self.quiz.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data["is_taken"])
        self.assertEqual(response.data["num_taken"], 0)


    def test_take_quiz_patch(self):
        data = {
            "quiz": self.quiz.id,
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.first().id
                }
            ]
        }
        response = self.client.post(reverse('take-quiz-list'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = {
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.last().id
                }
            ]
        }
        response = self.client.patch(reverse('take-quiz-detail', kwargs={'pk': response.data['id']}), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["answers"][0]["answer"], data["answers"][0]["answer"])

    def test_take_quiz_list(self):
        data = {
            "quiz": self.quiz.id,
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.first().id
                }
            ]
        }
        self.client.post(reverse('take-quiz-list'), data, format='json')
        response = self.client.get(reverse('take-quiz-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["user"], self.user.id)
        self.assertEqual(response.data["results"][0]["quiz"], self.quiz.id)
        self.assertIn("id", response.data["results"][0])
        self.assertIn("date", response.data["results"][0])
        self.assertEqual(response.data["results"][0]["answers"][0]["question"], data["answers"][0]["question"])
        self.assertEqual(response.data["results"][0]["answers"][0]["answer"], data["answers"][0]["answer"])

    
    def test_take_quiz_detail(self):
        data = {
            "quiz": self.quiz.id,
            "answers": [
                {
                    "question": self.quiz.questions.first().id,
                    "answer": self.quiz.questions.first().choices.first().id
                }
            ]
        }
        response = self.client.post(reverse('take-quiz-list'), data, format='json')
        response = self.client.get(reverse('take-quiz-detail', kwargs={'pk': response.data['id']}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["quiz"], self.quiz.id)
        self.assertIn("id", response.data)
        self.assertIn("date", response.data)
        self.assertEqual(response.data["answers"][0]["question"], data["answers"][0]["question"])
        self.assertEqual(response.data["answers"][0]["answer"], data["answers"][0]["answer"])