
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeViewSet
from .views import InterviewRoomView


router = DefaultRouter()
router.register(r'resumes', ResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('interview/', InterviewRoomView.as_view(), name='create-interview-room'),
]
