from rest_framework import serializers
from .models import Topic
from django.utils import timezone

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
        read_only_fields = ['created_at']

    # ✅ Field-level validations
    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        if len(value) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value

    def validate_max_responses(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError("Max responses must be greater than zero.")
        return value

    def validate_deadline(self, value):
        if value is not None and value <= timezone.now():
            raise serializers.ValidationError("Deadline must be in the future.")
        return value

    # ✅ Object-level validation (cross-field checks)
    def validate(self, data):
        # Example: if allow_report = True, max_responses must not be None
        if data.get("allow_report") and data.get("max_responses") is None:
            raise serializers.ValidationError(
                {"max_responses": "Max responses is required if reporting is enabled."}
            )
        return data
