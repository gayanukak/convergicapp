from django.urls import path
from .views import TopicCreateView, GuestView, HostView

urlpatterns = [
    path('topics/', TopicCreateView.as_view(), name='topic-create'),
    path('in/<str:code>/', GuestView.as_view(), name='guest-view'),
    path('out/<str:code>/', HostView.as_view(), name='host-view'),
]
