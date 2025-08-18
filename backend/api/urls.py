from django.urls import path
from .views import TopicCreateView, GuestView, HostView

urlpatterns = [
    path("topics/", TopicCreateView.as_view(), name="topic-create"),
    path("in/<str:code>/", GuestView.as_view(), name="guest-view"),  # GET topic, POST response
    path("in/<str:code>/responses/", ResponseCreateView.as_view(), name="response-create"),
    path("out/<str:code>/", HostView.as_view(), name="host-view"),
]
