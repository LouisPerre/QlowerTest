from rest_framework import serializers
from .models import Article

# Define the serializer class for the Task model to transform the object into JSON
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'