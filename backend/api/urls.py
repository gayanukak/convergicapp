from django.urls import path
from .views import TopicCreateView

urlpatterns = [
    path('topics/', TopicCreateView.as_view(), name='topic-create'),
]
