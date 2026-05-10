from django.db import models
import uuid


class BudgetEntry(models.Model):
    """Budget entry model for tracking trip expenses."""
    
    CATEGORY_CHOICES = [
        ('SIGHTSEEING', 'Sightseeing'),
        ('FOOD', 'Food & Dining'),
        ('TRANSPORT', 'Transport'),
        ('ACCOMMODATION', 'Accommodation'),
        ('SHOPPING', 'Shopping'),
        ('OTHER', 'Other'),
    ]
    
    ENTRY_TYPE_CHOICES = [
        ('PLANNED', 'Planned'),
        ('ACTUAL', 'Actual'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE, db_index=True, related_name='budget_entries')
    trip_stop = models.ForeignKey('trips.TripStop', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    label = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Always positive
    entry_type = models.CharField(max_length=10, choices=ENTRY_TYPE_CHOICES, default='PLANNED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'budget_entries'
        indexes = [
            models.Index(fields=['trip', 'category']),
            models.Index(fields=['trip', 'entry_type']),
        ]
    
    def __str__(self):
        return f"{self.label} - {self.amount} {self.trip.currency}"
