from django.db import models

# Create your models here.
class Article(models.Model):
    topic = models.CharField(max_length=200, blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    author = models.TextField(default="John Doe", blank=True, null=True)
    datetime_posted = models.DateField(auto_now_add=True)
    datetime_updated = models.DateField(blank=True, null=True)