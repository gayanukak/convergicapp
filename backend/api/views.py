from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import TopicSerializer

class TopicCreateView(APIView):
    # Optional: only allow authenticated users to post
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
                },
                status=status.HTTP_201_CREATED,
            )
        # Return field-specific errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
