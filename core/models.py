from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=120)
    headline = models.CharField(max_length=255)
    location = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    open_to_work = models.BooleanField(default=True)
    about = models.TextField()
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    portfolio_link = models.URLField(blank=True, null=True)
    photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    role_titles = models.CharField(max_length=512, default="Full Stack Developer, Python Expert", help_text="Comma-separated titles for typewriter effect")

    def __cl__(self):
        return f"Profile: {self.name}"

    def __str__(self):
        return self.name


class Education(models.Model):
    profile = models.ForeignKey(Profile, related_name='education', on_delete=models.CASCADE)
    period = models.CharField(max_length=50)
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=255)
    details = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} at {self.institution}"


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Skill Categories"
        ordering = ['order']

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Project(models.Model):
    profile = models.ForeignKey(Profile, related_name='projects', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    stack = models.CharField(max_length=255, help_text="Comma-separated list of technologies (e.g., React, Django, NLP)")
    description = models.TextField()
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Experience(models.Model):
    profile = models.ForeignKey(Profile, related_name='experience', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Experience"
        ordering = ['order']

    def __str__(self):
        return f"{self.title} at {self.company}"


class Certification(models.Model):
    profile = models.ForeignKey(Profile, related_name='certifications', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='certifications/', blank=True, null=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        subject = self.subject.strip()
        return f"{self.name} ({self.email})" + (f" - {subject}" if subject else "")
