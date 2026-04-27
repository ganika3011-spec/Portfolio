from rest_framework import serializers
from .models import (
    ContactMessage, Profile, Education, SkillCategory, 
    Skill, Project, Experience, Certification
)

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ["period", "degree", "institution", "details"]

class SkillSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Skill
        fields = ["name", "category_name"]

class SkillCategorySerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = ["name", "description", "items"]

    def get_items(self, obj):
        return [skill.name for skill in obj.skills.all()]

class ProjectSerializer(serializers.ModelSerializer):
    stack = serializers.SerializerMethodField()
    links = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ["title", "image", "stack", "description", "links"]

    def get_stack(self, obj):
        return [s.strip() for s in obj.stack.split(',') if s.strip()]

    def get_links(self, obj):
        return {
            "github": obj.github_link or "",
            "live": obj.live_link or "",
        }

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["title", "company", "period", "description", "link"]

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["name", "file"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # If file exists, return the absolute URL, otherwise just the name if we want to maintain compatibility or something.
        # But the user asked for a file option, so we should return both or just the data.
        # Let's return the original string if no file exists for backwards compatibility with the old data if possible.
        if not instance.file:
            return instance.name
        return data

class ProfileSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(read_only=True)
    role_titles = serializers.CharField(read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    skills = serializers.SerializerMethodField()
    certifications = CertificationSerializer(many=True, read_only=True)
    links = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "name", "headline", "location", "email", "phone", 
            "photo", "open_to_work", "links", "about", "role_titles", "education", 
            "skills", "projects", "experience", "certifications"
        ]

    def get_skills(self, obj):
        categories = SkillCategory.objects.all()
        # The frontend expects a dictionary where keys are category names (lowercased/underscored based on old PROFILE)
        # However, the old PROFILE had keys like 'frontend', 'backend', 'machine_learning', etc.
        # We can try to map them or just use the category names directly.
        skill_dict = {}
        for cat in categories:
            key = cat.name.lower().replace(' ', '_')
            skill_dict[key] = {
                "items": [s.name for s in cat.skills.all()],
                "description": cat.description or ""
            }
        return skill_dict


    def get_links(self, obj):
        return {
            "github": obj.github_link or "",
            "linkedin": obj.linkedin_link or "",
            "portfolio": obj.portfolio_link or "",
        }

class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]
