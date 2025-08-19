from django.urls import path
from .views import TopicCreateView, GuestView, HostTopicListView, HostTopicDetailView, HostResponseListView, ResponseCreateView

urlpatterns = [
    path("topic-create/", TopicCreateView.as_view(), name="topic-create"),
    path("in/<str:code>/", GuestView.as_view(), name="guest-view"),  # GET topic, POST response
    path("in/<str:code>/responses/", ResponseCreateView.as_view(), name="response-create"),
    path("topics/", HostTopicListView.as_view(), name="topic-detail"),
    path("out/<str:code>/", HostTopicDetailView.as_view(), name="topic-detail"),
    path("out/<str:code>/reponses", HostResponseListView.as_view(), name="response-list"),
]
