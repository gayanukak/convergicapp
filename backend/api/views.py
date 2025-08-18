from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
# from django.conf import settings
# import requests

from .serializers import TopicSerializer, ResponseSerializer
from .models import Topic


class TopicCreateView(APIView):
    """
    Host creates a new Topic
    """

    def post(self, request, *args, **kwargs):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            topic = serializer.save()
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
                    "guest_link": f"/in/{topic.code}/",
                    "host_link": f"/out/{topic.code}/",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GuestView(APIView):
    """
    For participants to view topic details
    (GET only)
    """

    def get(self, request, code):
        topic = get_object_or_404(Topic, code=code)
        return Response({
            "title": topic.title,
            "description": topic.description,
            "deadline": topic.deadline,
        })


class ResponseCreateView(APIView):
    """
    For participants to submit a response
    (POST only, reCAPTCHA check disabled for now)
    """

    def post(self, request, code):
        topic = get_object_or_404(Topic, code=code)

        # 🔒 reCAPTCHA temporarily disabled for testing
        # recaptcha_token = request.data.get("recaptcha")
        # if not recaptcha_token:
        #     return Response({"error": "Missing reCAPTCHA token."}, status=status.HTTP_400_BAD_REQUEST)

        # verify_url = "https://www.google.com/recaptcha/api/siteverify"
        # payload = {
        #     "secret": settings.RECAPTCHA_SECRET_KEY,
        #     "response": recaptcha_token,
        # }
        # r = requests.post(verify_url, data=payload)
        # result = r.json()

        # if not result.get("success"):
        #     return Response({"error": "Invalid reCAPTCHA. Try again."}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Save guest response
        serializer = ResponseSerializer(
            data=request.data,
            context={"topic": topic}
        )
        if serializer.is_valid():
            response = serializer.save()
            return Response(
                {
                    "id": response.id,
                    "text": response.text,
                    "created_at": response.created_at,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HostView(APIView):
    """
    For host/admin to manage topic (out link)
    """

    def get(self, request, code):
        topic = get_object_or_404(Topic, code=code)
        return Response({
            "title": topic.title,
            "description": topic.description,
            "deadline": topic.deadline,
            "max_responses": topic.max_responses,
            "allow_report": topic.allow_report,
            "only_logged_in": topic.only_logged_in,
            "created_at": topic.created_at,
            "total_responses": topic.responses.count(),
        })
