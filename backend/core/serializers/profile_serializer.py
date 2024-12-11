from .serializers import ForumBookmarkSerializer
from .take_quiz_serializer import TakeQuizSerializer
from ..models import CustomUser, ForumBookmark, TakeQuiz
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):
    bookmarked_forums = serializers.SerializerMethodField()
    taken_quizzes = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'full_name', 'avatar', 'taken_quizzes', 'bookmarked_forums', 'score']  # Include fields you want to expose
        read_only_fields = ['id']
    
    def get_bookmarked_forums(self, obj):
        bookmarks = ForumBookmark.objects.filter(user=obj)
        return ForumBookmarkSerializer(bookmarks, many=True).data
 
    def get_taken_quizzes(self, obj):
        quizzes = TakeQuiz.objects.filter(user=obj)
        return TakeQuizSerializer(quizzes, many=True).data
    
    def get_score(self, obj):
        quizzes = TakeQuiz.objects.filter(user=obj)
        return sum([quiz.score for quiz in quizzes])