import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.api import PROFILE
from core.models import (
    Profile, Education, SkillCategory, 
    Skill, Project, Experience, Certification
)

def migrate():
    # Create Profile
    profile_obj, created = Profile.objects.get_or_create(
        email=PROFILE['email'],
        defaults={
            'name': PROFILE['name'],
            'headline': PROFILE['headline'],
            'location': PROFILE['location'],
            'phone': PROFILE['phone'],
            'open_to_work': PROFILE.get('open_to_work', True),
            'about': PROFILE['about'],
            'github_link': PROFILE['links'].get('github'),
            'linkedin_link': PROFILE['links'].get('linkedin'),
            'portfolio_link': PROFILE['links'].get('portfolio'),
        }
    )
    
    if not created:
        print(f"Profile for {profile_obj.name} already exists. Skipping core migration.")
        return

    # Education
    for edu in PROFILE['education']:
        Education.objects.create(
            profile=profile_obj,
            period=edu['period'],
            degree=edu['degree'],
            institution=edu['institution'],
            details=edu.get('details')
        )

    # Skills
    for cat_name, skill_list in PROFILE['skills'].items():
        # Map internal keys to display names
        display_name = cat_name.replace('_', ' ').title()
        cat_obj, _ = SkillCategory.objects.get_or_create(name=display_name)
        for s_name in skill_list:
            Skill.objects.get_or_create(category=cat_obj, name=s_name)

    # Projects
    for i, proj in enumerate(PROFILE['projects']):
        Project.objects.create(
            profile=profile_obj,
            title=proj['title'],
            stack=", ".join(proj['stack']),
            description=proj.get('description', ''),
            github_link=proj['links'].get('github'),
            live_link=proj['links'].get('live'),
            order=i
        )

    # Experience
    for i, exp in enumerate(PROFILE.get('experience', [])):
        Experience.objects.create(
            profile=profile_obj,
            title=exp['title'],
            company=exp['company'],
            period=exp['period'],
            description=exp.get('description'),
            link=exp.get('link'),
            order=i
        )

    # Certifications
    for cert_name in PROFILE['certifications']:
        Certification.objects.create(
            profile=profile_obj,
            name=cert_name
        )

    print("Data migration completed successfully!")

if __name__ == "__main__":
    migrate()
