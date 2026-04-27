from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactMessageCreateSerializer


PROFILE = {
    "name": "Ganika Chauhan",
    "headline": "Python Django & Web Developer | MongoDB | AI & ML Enthusiast | Full Stack Developer",
    "location": "Faridabad, Haryana, India",
    "email": "ganika3011@gmail.com",
    "phone": "8595287008",
    "open_to_work": True,
    "links": {
        "github": "",
        "linkedin": "",
        "portfolio": "",
    },
    "about": (
        "I am a Computer Science student with a strong interest in Artificial Intelligence and Machine Learning. "
        "I also have experience in web development, backend programming, and working with databases. "
        "I enjoy building websites and smart systems that solve real problems. "
        "I am always eager to learn new technologies and want to grow my career by working on real-world projects "
        "in AI, ML, and software development."
    ),
    "education": [
        {
            "period": "2022 - 2026",
            "degree": "B.Tech in Computer Science and Engineering",
            "institution": "Satyug Darshan Institute of Engineering & Technology, Faridabad",
            "details": "Current CGPA: 8.5 (2025 – Present)",
        },
        {
            "period": "2021 - 2022",
            "degree": "12th – BSEH Board",
            "institution": "Deep Senior Secondary School",
            "details": "94%",
        },
        {
            "period": "2018 - 2019",
            "degree": "10th – BSEH Board",
            "institution": "Deep Senior Secondary School",
            "details": "95%",
        },
    ],
    "skills": {
        "frontend": ["HTML", "CSS", "JavaScript", "Bootstrap", "React"],
        "backend": ["Python (Django)", "Node.js", "Express.js"],
        "machine_learning": ["Scikit-learn", "Matplotlib", "Pandas", "NumPy", "Tkinter"],
        "databases": ["MongoDB"],
        "tools": ["VS Code", "Postman", "MongoDB Compass"],
        "core": ["Data Structures and Algorithms"],
    },
    "projects": [
        {
            "title": "Resume Screening AI",
            "stack": ["Python (Flask)", "NLP", "Machine Learning", "HTML", "CSS"],
            "description": (
                "An AI-powered web application that uses NLP and Machine Learning to automatically extract information from resumes, "
                "categorize candidates, and match them with job requirements via a modern dark UI."
            ),
            "links": {"github": "", "live": "https://resume-and-job-matching.onrender.com"},
        },
        {
            "title": "ShoppingKart (E-commerce Platform)",
            "stack": ["React", "JavaScript", "UI/UX", "E-commerce"],
            "description": (
                "An online shopping platform with categories, product listing, cart actions, and a built-in shopping assistant widget."
            ),
            "links": {"github": "", "live": "https://shoppingkart-rdlq.onrender.com"},
        },
        {
            "title": "Fitness Website",
            "stack": ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
            "description": "A fitness-focused website with backend and database integration.",
            "links": {"github": "", "live": ""},
        },
        {
            "title": "Dance Registration Website",
            "stack": ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
            "description": "A registration website for dance sign-ups with a simple backend.",
            "links": {"github": "", "live": ""},
        },
        {
            "title": "Weather Forecast Prediction",
            "stack": ["Python", "Machine Learning"],
            "description": "A basic ML project to predict weather forecast outcomes.",
            "links": {"github": "", "live": ""},
        },
        {
            "title": "Stone, Paper, Scissor Game",
            "stack": ["Python", "Tkinter"],
            "description": "A desktop GUI game built with Tkinter.",
            "links": {"github": "", "live": ""},
        },
        {
            "title": "Weather Forecast Application",
            "stack": ["Python", "Django", "HTML", "CSS", "JavaScript"],
            "description": "A Django-based web app for weather forecasting.",
            "links": {"github": "", "live": ""},
        },
    ],
    "experience": [],
    "certifications": [
        "Generative AI Arcade game and Google Cloud Computing Foundation",
        "Quiz webinars organised by team ‘skillEcted’",
        "Basics of Python",
        "Basics of Machine Learning Algorithms",
        "Generative AI Studio",
        "Basics of Microsoft Power BI and DAX",
        "Prompt Design in Vertex AI",
    ],
}


class ProfileView(APIView):
    def get(self, request):
        return Response(PROFILE)


class ContactView(APIView):
    def post(self, request):
        serializer = ContactMessageCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message_obj = serializer.save()

        # Send email notification
        try:
            from django.core.mail import EmailMessage
            
            email = EmailMessage(
                subject=f"New Portfolio Message: {message_obj.subject or 'No Subject'}",
                body=f"From: {message_obj.name} ({message_obj.email})\n\nMessage:\n{message_obj.message}",
                from_email=None,
                to=["ganika3011@gmail.com"],
                reply_to=[message_obj.email],
            )
            email.send(fail_silently=False)
        except Exception as e:
            # Log the error and return a failure response
            print(f"Error sending email: {e}")
            return Response(
                {"ok": False, "error": "Message saved but email notification failed. Please check backend credentials."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({"ok": True}, status=status.HTTP_201_CREATED)


class HealthView(APIView):
    def get(self, request):
        return Response({"status": "ok"})
