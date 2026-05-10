from django.db import models
from django.core.exceptions import ValidationError
import uuid


class TripActivity(models.Model):
    """Activity model for trip activities."""
    
    CATEGORY_CHOICES = [
        ('SIGHTSEEING', 'Sightseeing'),
        ('FOOD', 'Food & Dining'),
        ('TRANSPORT', 'Transport'),
        ('ACCOMMODATION', 'Accommodation'),
        ('SHOPPING', 'Shopping'),
        ('OTHER', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip_stop = models.ForeignKey('trips.TripStop', on_delete=models.CASCADE, db_index=True, related_name='activities')
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='OTHER')
    description = models.TextField(null=True, blank=True)
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default='USD')
    is_completed = models.BooleanField(default=False)
    booking_ref = models.CharField(max_length=100, null=True, blank=True)
    position = models.PositiveSmallIntegerField(default=0)  # order within stop
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trip_activities'
        indexes = [
            models.Index(fields=['trip_stop', 'date']),
            models.Index(fields=['trip_stop', 'position']),
        ]
    
    def clean(self):
        if self.date < self.trip_stop.start_date or self.date > self.trip_stop.end_date:
            raise ValidationError({'date': 'Activity date must be within stop date range.'})
        if self.cost < 0:
            raise ValidationError({'cost': 'Cost must be 0 or greater.'})
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.title} - {self.trip_stop.city.name}"
