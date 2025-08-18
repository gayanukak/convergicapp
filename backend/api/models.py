from django.db import models
from .utils import generate_code  # safe, no circular import


class Topic(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    code = models.CharField(
        max_length=20,
        unique=True,
        blank=True,  # populate in save()
    )
    deadline = models.DateTimeField(null=True, blank=True)
    max_responses = models.PositiveIntegerField(null=True, blank=True)
    allow_report = models.BooleanField(default=False)
    only_logged_in = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_code()  # will call utils without circular import
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.code})"


class Response(models.Model):
    topic = models.ForeignKey(
        Topic, on_delete=models.CASCADE, related_name="responses"
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response to {self.topic.code} - {self.text[:20]}"
