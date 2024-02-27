# The part at the top is here if you want to use the django rest framework, but the lower part dont use it

# from rest_framework import generics
# from .models import Article
# from .serializers import ArticleSerializer
# from rest_framework.response import Response
# from rest_framework.exceptions import ValidationError
# from django.utils import timezone

# # Create your views here.

# # List all tasks contains in the postgres database
# class ArticleList(generics.ListAPIView):
#     # Order the result by id
#     queryset = Article.objects.all().order_by('id')
#     serializer_class = ArticleSerializer

# # Update a task and allow partial update
# class ArticleUpdate(generics.UpdateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     partial = True

#     def perform_update(self, serializer):
#         serializer.save(datetime_updated=timezone.now().date())
    

# class ArticleCreate(generics.CreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     # Create a new Task and validate that all the field are present
#     def perform_create(self, serializer):
#         data = serializer.validated_data
#         print(data)
#         if 'topic' not in data or 'body' not in data or 'author' not in data:
#             raise ValidationError("All fields are required")
#         serializer.save()

# # Retrieve a task by its id
# class ArticleDetail(generics.RetrieveAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from .models import Article
from django.http import JsonResponse
from django.utils import timezone
import json

@csrf_exempt
def ArticleViewCreate(request):
    if (request.method == "POST"):
        try:
            body = json.loads(request.body.decode("utf-8"))
            if 'topic' not in body or 'body' not in body or 'author' not in body:
                return JsonResponse({"error": "All fields are required"}, status=400)
            newArticle = Article.objects.create(topic=body['topic'], body=body['body'], author=body['author'])
            newArticle.save()
            return JsonResponse({"Success": "Article created"}, status=201)
        except json.decoder.JSONDecodeError as e:
            print("Errueur", e)

@csrf_exempt
def ArticleViewDetail(request, id):
    if (request.method == "GET"):
        try:
            article = Article.objects.get(id=id)
            return JsonResponse({"id": article.id, "topic": article.topic, "body": article.body, "author": article.author, "datetime_posted": article.datetime_posted, "datetime_updated": article.datetime_updated}, status=200)
        except json.decoder.JSONDecodeError as e:
            print("Erreur", e)

@csrf_exempt
def ArticleViewUpdate(request, id):
    if (request.method == "PUT"):
        try:
            article = Article.objects.get(id=id)
        except Article.DoesNotExist:
            return JsonResponse({"error": "Article not found"}, status=404)
        
        body = json.loads(request.body.decode("utf-8"))

        if 'topic' in body:
            article.topic = body['topic']
        if 'body' in body:  
            article.body = body['body']
        if 'author' in body:
            article.author = body['author']

        article.datetime_updated = timezone.now().date()
        article.save()

        return JsonResponse({"Success": "Article updated"}, status=200)
    
@csrf_exempt
def ArticleViewList(request):
    if (request.method == "GET"):
        articles = Article.objects.all().order_by('id')
        return JsonResponse({"articles": list(articles.values())}, status=200)