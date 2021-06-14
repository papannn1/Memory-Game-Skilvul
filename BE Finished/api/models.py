from django.db import models

class TimeRecord(models.Model):
    nickname = models.CharField(max_length=10, default=None)
    finish_time = models.IntegerField()
