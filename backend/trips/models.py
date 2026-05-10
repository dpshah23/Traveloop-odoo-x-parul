from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import uuid
import secrets
import string


def generate_share_slug():
    """Generate a unique URL-safe share slug."""
    return secrets.token_urlsafe(12)


User = get_user_model()


class Trip(models.Model):
    """Trip model representing a travel plan."""
    
    STATUS_CHOICES = [
        ('PLANNING', 'Planning'),
        ('CONFIRMED', 'Confirmed'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]
    
    CURRENCY_CHOICES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('INR', 'Indian Rupee'),
        ('GBP', 'British Pound'),
        ('AUD', 'Australian Dollar'),
        ('CAD', 'Canadian Dollar'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True, related_name='trips')
    title = models.CharField(max_length=200, db_index=True)
    description = models.TextField(null=True, blank=True)
    cover_image = models.URLField(null=True, blank=True)
    start_date = models.DateField(db_index=True)
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PLANNING')
    is_public = models.BooleanField(default=False)
    share_slug = models.CharField(max_length=20, unique=True, default=generate_share_slug)
    total_budget = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trips'
        indexes = [
            models.Index(fields=['owner', 'status']),
            models.Index(fields=['share_slug']),
            models.Index(fields=['start_date']),
        ]
    
    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError({'end_date': 'End date must be greater than or equal to start date.'})
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title} ({self.owner.username})"


class TripStop(models.Model):
    """Represents a city stop within a trip."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, db_index=True, related_name='stops')
    city = models.ForeignKey('cities.City', on_delete=models.PROTECT, related_name='stops')
    position = models.PositiveSmallIntegerField()  # 0-indexed position within trip
    start_date = models.DateField()
    end_date = models.DateField()
    notes = models.TextField(null=True, blank=True)
    daily_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trip_stops'
        unique_together = ('trip', 'position')
        indexes = [
            models.Index(fields=['trip', 'start_date']),
        ]
    
    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError({'end_date': 'End date must be >= start date.'})
        if self.start_date < self.trip.start_date or self.end_date > self.trip.end_date:
            raise ValidationError('Stop dates must be within trip date range.')
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.city.name} ({self.trip.title})"

