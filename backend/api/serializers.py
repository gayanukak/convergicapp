from rest_framework import serializers
from django.utils import timezone
from .models import Topic, Response as TopicResponse


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = [
            "id",
            "title",
            "description",
            "code",
            "deadline",
            "max_responses",
            "allow_report",
            "only_logged_in",
            "created_at",
        ]
        # code is generated server-side; created_at is auto
        read_only_fields = ["code", "created_at"]

    # Field-level validations
    def validate_title(self, value: str):
        if not value or not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value.strip()

    def validate_max_responses(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError("Max responses must be greater than zero.")
        return value

    def validate_deadline(self, value):
        if value is not None and value <= timezone.now():
            raise serializers.ValidationError("Deadline must be in the future.")
        return value

    # Object-level validation (cross-field checks)
    def validate(self, data):
        # Handle updates where some fields may not be in `data`
        allow_report = data.get(
            "allow_report",
            getattr(self.instance, "allow_report", False),
        )
        max_responses = data.get(
            "max_responses",
            getattr(self.instance, "max_responses", None),
        )

        if allow_report and max_responses is None:
            raise serializers.ValidationError(
                {"max_responses": "Max responses is required if reporting is enabled."}
            )
        return data


class ResponseSerializer(serializers.ModelSerializer):
    # We set topic from the view using serializer context; keep it read-only here
    topic = serializers.PrimaryKeyRelatedField(read_only=True)
    text = serializers.CharField(
        max_length=5000,
        min_length=2,
        allow_blank=False,
        trim_whitespace=True
    )

    class Meta:
        model = TopicResponse
        fields = ["id", "topic", "text", "created_at"]
        read_only_fields = ["id", "topic", "created_at"]

    def validate_text(self, value: str):
        if not value or not value.strip():
            raise serializers.ValidationError("Response text cannot be empty.")
        text = value.strip()
        if len(text) < 2:
            raise serializers.ValidationError("Response text is too short.")
        if len(text) > 5000:
            raise serializers.ValidationError("Response text is too long (max 5000 characters).")
        return text

    def validate(self, data):
        """
        Enforce topic business rules at submission time:
        - Deadline not passed.
        - Max responses not exceeded.
        """
        topic = self.context.get("topic")
        if not topic:
            # View must pass topic in context; if not, skip topic-based checks here.
            return data

        now = timezone.now()
        if topic.deadline and topic.deadline <= now:
            raise serializers.ValidationError(
                {"non_field_errors": ["This topic is closed (deadline passed)."]}
            )

        if topic.max_responses is not None and topic.responses.count() >= topic.max_responses:
            raise serializers.ValidationError(
                {"non_field_errors": ["Maximum number of responses reached."]}
            )

        return data

    def create(self, validated_data):
        topic = self.context.get("topic")
        return TopicResponse.objects.create(topic=topic, **validated_data)
