from django.db import models
import uuid


class PackingItem(models.Model):
    """Packing list item model."""
    
    CATEGORY_CHOICES = [
        ('CLOTHING', 'Clothing'),
        ('DOCUMENTS', 'Documents'),
        ('ELECTRONICS', 'Electronics'),
        ('HEALTH', 'Health & Toiletries'),
        ('OTHER', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE, related_name='packing_items')
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    is_packed = models.BooleanField(default=False)
    quantity = models.PositiveSmallIntegerField(default=1)
    is_essential = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'packing_items'
    
    def __str__(self):
        return f"{self.name} ({self.trip.title})"
