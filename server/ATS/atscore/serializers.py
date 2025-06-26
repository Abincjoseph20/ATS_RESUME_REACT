# ats/server/atscore/serializers.py
from rest_framework import serializers
from .models import Resume,InterviewAudio

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'
        read_only_fields = ['ats_score', 'matched_keywords', 'raw_text'] 
        
        
class InterviewAudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewAudio
        fields = ['id', 'candidate_name', 'audio_file', 'uploaded_at']