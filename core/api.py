from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ContactMessageCreateSerializer


# PROFILE data removed as it is now managed via the database.


from .models import Profile
from .serializers import ContactMessageCreateSerializer, ProfileSerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.prefetch_related(
            'education', 'projects', 'experience', 'certifications'
        ).first()
        if not profile:
            return Response({"error": "No profile found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class ContactView(APIView):
    def post(self, request):
        serializer = ContactMessageCreateSerializer(data=request.data)
        if serializer.is_valid():
            # Basic Anti-spam check (e.g., message length)
            message = serializer.validated_data.get('message', '')
            if len(message) < 10:
                return Response({"error": "Message too short"}, status=status.HTTP_400_BAD_REQUEST)
            
            message_obj = serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
