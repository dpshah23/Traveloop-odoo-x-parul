from django.db import models


class City(models.Model):
    """City model for travel destinations."""
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True, db_index=True)
    country = models.CharField(max_length=200)
    country_code = models.CharField(max_length=2)  # ISO 3166-1 alpha-2
    timezone = models.CharField(max_length=100, default='UTC')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cities'
        verbose_name_plural = 'Cities'
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['country']),
        ]
    
    def __str__(self):
        return f"{self.name}, {self.country}"
