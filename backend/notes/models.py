from django.db import models
import uuid


class TripNote(models.Model):
    """Trip note model for journal entries and reminders."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey('trips.Trip', on_delete=models.CASCADE, db_index=True, related_name='notes')
    trip_stop = models.ForeignKey('trips.TripStop', on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    content = models.TextField()  # Markdown-aware
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trip_notes'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.trip.title}"
