# Importing necessary modules and libraries
from rest_framework import viewsets, status                    # viewsets to create RESTful API, status for response codes
from rest_framework.response import Response                  # To send custom responses
from .models import Resume                                    # Resume model
from .serializers import ResumeSerializer                     # Serializer for Resume model
from .utils import JOB_KEYWORDS                               # Dictionary containing job roles and their related keywords

import fitz    # PyMuPDF used for extracting text from PDF files
import docx    # python-docx used for extracting text from DOCX files
import os      # OS module for interacting with file paths

# Define the ResumeViewSet class to handle API endpoints for Resume
class ResumeViewSet(viewsets.ModelViewSet):
    
    # The queryset defines all Resume objects, ordered by newest first
    queryset = Resume.objects.all().order_by('-uploaded_at')
    
    # This defines which serializer class should be used
    serializer_class = ResumeSerializer

    # Override the default create method to add custom logic
    def create(self, request, *args, **kwargs):

        # Deserialize and validate the incoming data
        serializer = ResumeSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the resume object to database temporarily
            resume = serializer.save()

            # Get the file path of the uploaded resume
            file_path = resume.file.path
            text = ""  # This will hold the extracted text from the file

            # -------------------------------
            # TEXT EXTRACTION FROM RESUME
            # -------------------------------
            # Check if the uploaded file is a PDF
            if file_path.endswith(".pdf"):
                doc = fitz.open(file_path)  # Open the PDF using PyMuPDF
                for page in doc:
                    text += page.get_text()  # Extract text from each page

            # Check if the uploaded file is a DOCX (Word) document
            elif file_path.endswith(".docx"):
                doc = docx.Document(file_path)  # Open the DOCX file
                for para in doc.paragraphs:
                    text += para.text + "\n"  # Add each paragraph's text with a newline

            # -------------------------------
            # KEYWORD MATCHING & SCORING
            # -------------------------------
            # Convert job_role to lowercase for consistency
            job_role = resume.job_role.lower()

            # Try to get the list of keywords for the given job_role
            if job_role in JOB_KEYWORDS:
                keywords = JOB_KEYWORDS[job_role]
            else:
                keywords = []  # Default to empty list if no keywords are defined

            matched = []  # This will store the keywords that are found in the resume text

            # Loop through each keyword to check if it's present in the resume text
            for word in keywords:
                lower_word = word.lower()     # Lowercase keyword
                lower_text = text.lower()     # Lowercase resume text

                if lower_word in lower_text:
                    matched.append(word)  # Add to matched list if found

            # Calculate ATS score based on number of matched keywords
            if len(keywords) > 0:
                score = (len(matched) / len(keywords)) * 100
                score = round(score, 2)  # Round to 2 decimal places
            else:
                score = 0  # No keywords means score is 0

            # Save the processed result to the resume instance
            resume.ats_score = score                          # Save the score
            resume.set_matched_keywords(matched)             # Save matched keywords as JSON string
            resume.raw_text = text                            # Save the entire raw text
            resume.save()                                     # Save changes to database

            # Return the result in the API response
            return Response({
                'ats_score': score,
                'matched_keywords': matched
            }, status=status.HTTP_201_CREATED)

        # If serializer was not valid, return error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
