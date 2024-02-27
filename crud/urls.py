from django.urls import path
from . import views

# Route for the django rest framework
# Define the route for the API with the methods to call and a route name
# urlpatterns = [
#     path('articles', views.ArticleList.as_view(), name='articles-list'),
#     path('article/<int:pk>/', views.ArticleUpdate.as_view(), name='article-update'),
#     path('article/create/', views.ArticleCreate.as_view(), name='article-create'),
#     path('article/detail/<int:pk>/', views.ArticleDetail.as_view(), name='article-detail')
# ]

urlpatterns = [
    path('article/create/', views.ArticleViewCreate, name='article-create'),
    path('article/detail/<int:id>/', views.ArticleViewDetail, name='article-detail'),
    path('article/update/<int:id>/', views.ArticleViewUpdate, name="article-update"),
    path('articles/', views.ArticleViewList, name="articles-list")
]
