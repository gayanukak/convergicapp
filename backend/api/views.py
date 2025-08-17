from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import TopicSerializer
from .models import Topic

class TopicCreateView(APIView):
    # Optional: only allow authenticated users to create topics (host)
    # permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            topic = serializer.save()  # ✅ saves to DB
            return Response(
                {
                    "id": topic.id,
                    "title": topic.title,
                    "description": topic.description,
                    "deadline": topic.deadline,
                    "max_responses": topic.max_responses,
                    "allow_report": topic.allow_report,
                    "only_logged_in": topic.only_logged_in,
                    "created_at": topic.created_at,
                    "guest_link": f"/in/{topic.code}/",  # participant
                    "host_link": f"/out/{topic.code}/",  # admin/host
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GuestView(APIView):
    """For participants to submit ideas (in link)"""
    def get(self, request, code):
        try:
            topic = Topic.objects.get(code=code)
            return Response({
                "title": topic.title,
                "description": topic.description,
            })
        except Topic.DoesNotExist:
            return Response({"error": "Topic not found"}, status=status.HTTP_404_NOT_FOUND)


class HostView(APIView):
    """For host/admin to manage topic (out link)"""
    def get(self, request, code):
        try:
            topic = Topic.objects.get(code=code)
            return Response({
                "title": topic.title,
                "description": topic.description,
                "deadline": topic.deadline,
                "max_responses": topic.max_responses,
                "allow_report": topic.allow_report,
                "only_logged_in": topic.only_logged_in,
                "created_at": topic.created_at,
            })
        except Topic.DoesNotExist:
            return Response({"error": "Topic not found"}, status=status.HTTP_404_NOT_FOUND)
