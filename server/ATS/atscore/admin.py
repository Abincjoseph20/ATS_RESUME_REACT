# ats/server/atscore/admin.py
from django.contrib import admin
from .models import Resume

admin.site.register(Resume)
