from django.db import models

class Topic(models.Model):
    title = models.CharField(max_length=255)          # Main topic / question
    description = models.TextField(blank=True)        # Supporting info
    deadline = models.DateTimeField(null=True, blank=True)
    max_responses = models.PositiveIntegerField(null=True, blank=True)
    allow_report = models.BooleanField(default=False)
    only_logged_in = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title