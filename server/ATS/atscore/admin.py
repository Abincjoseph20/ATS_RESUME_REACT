# ats/server/atscore/admin.py
from django.contrib import admin
from .models import Resume,InterviewAudio

admin.site.register(Resume)
admin.site.register(InterviewAudio)
