from django.core.management.base import BaseCommand
from cities.models import City


class Command(BaseCommand):
    help = 'Seed database with popular cities'

    def handle(self, *args, **options):
        cities_data = [
            {'name': 'Paris', 'country': 'France', 'country_code': 'FR', 'timezone': 'Europe/Paris', 'latitude': 48.8566, 'longitude': 2.3522},
            {'name': 'London', 'country': 'United Kingdom', 'country_code': 'GB', 'timezone': 'Europe/London', 'latitude': 51.5074, 'longitude': -0.1278},
            {'name': 'Tokyo', 'country': 'Japan', 'country_code': 'JP', 'timezone': 'Asia/Tokyo', 'latitude': 35.6762, 'longitude': 139.6503},
            {'name': 'New York', 'country': 'United States', 'country_code': 'US', 'timezone': 'America/New_York', 'latitude': 40.7128, 'longitude': -74.0060},
            {'name': 'Sydney', 'country': 'Australia', 'country_code': 'AU', 'timezone': 'Australia/Sydney', 'latitude': -33.8688, 'longitude': 151.2093},
            {'name': 'Dubai', 'country': 'United Arab Emirates', 'country_code': 'AE', 'timezone': 'Asia/Dubai', 'latitude': 25.2048, 'longitude': 55.2708},
            {'name': 'Singapore', 'country': 'Singapore', 'country_code': 'SG', 'timezone': 'Asia/Singapore', 'latitude': 1.3521, 'longitude': 103.8198},
            {'name': 'Barcelona', 'country': 'Spain', 'country_code': 'ES', 'timezone': 'Europe/Madrid', 'latitude': 41.3851, 'longitude': 2.1734},
            {'name': 'Rome', 'country': 'Italy', 'country_code': 'IT', 'timezone': 'Europe/Rome', 'latitude': 41.9028, 'longitude': 12.4964},
            {'name': 'Amsterdam', 'country': 'Netherlands', 'country_code': 'NL', 'timezone': 'Europe/Amsterdam', 'latitude': 52.3676, 'longitude': 4.9041},
            {'name': 'Bangkok', 'country': 'Thailand', 'country_code': 'TH', 'timezone': 'Asia/Bangkok', 'latitude': 13.7563, 'longitude': 100.5018},
            {'name': 'Mumbai', 'country': 'India', 'country_code': 'IN', 'timezone': 'Asia/Kolkata', 'latitude': 19.0760, 'longitude': 72.8777},
            {'name': 'Delhi', 'country': 'India', 'country_code': 'IN', 'timezone': 'Asia/Kolkata', 'latitude': 28.7041, 'longitude': 77.1025},
            {'name': 'Bangkok', 'country': 'Thailand', 'country_code': 'TH', 'timezone': 'Asia/Bangkok', 'latitude': 13.7563, 'longitude': 100.5018},
            {'name': 'Istanbul', 'country': 'Turkey', 'country_code': 'TR', 'timezone': 'Europe/Istanbul', 'latitude': 41.0082, 'longitude': 28.9784},
            {'name': 'Berlin', 'country': 'Germany', 'country_code': 'DE', 'timezone': 'Europe/Berlin', 'latitude': 52.5200, 'longitude': 13.4050},
            {'name': 'Vienna', 'country': 'Austria', 'country_code': 'AT', 'timezone': 'Europe/Vienna', 'latitude': 48.2082, 'longitude': 16.3738},
            {'name': 'Prague', 'country': 'Czech Republic', 'country_code': 'CZ', 'timezone': 'Europe/Prague', 'latitude': 50.0755, 'longitude': 14.4378},
            {'name': 'Geneva', 'country': 'Switzerland', 'country_code': 'CH', 'timezone': 'Europe/Zurich', 'latitude': 46.2022, 'longitude': 6.1432},
            {'name': 'Toronto', 'country': 'Canada', 'country_code': 'CA', 'timezone': 'America/Toronto', 'latitude': 43.6629, 'longitude': -79.3957},
            {'name': 'Los Angeles', 'country': 'United States', 'country_code': 'US', 'timezone': 'America/Los_Angeles', 'latitude': 34.0522, 'longitude': -118.2437},
            {'name': 'San Francisco', 'country': 'United States', 'country_code': 'US', 'timezone': 'America/Los_Angeles', 'latitude': 37.7749, 'longitude': -122.4194},
            {'name': 'Mexico City', 'country': 'Mexico', 'country_code': 'MX', 'timezone': 'America/Mexico_City', 'latitude': 19.4326, 'longitude': -99.1332},
            {'name': 'Rio de Janeiro', 'country': 'Brazil', 'country_code': 'BR', 'timezone': 'America/Sao_Paulo', 'latitude': -22.9068, 'longitude': -43.1729},
            {'name': 'Buenos Aires', 'country': 'Argentina', 'country_code': 'AR', 'timezone': 'America/Argentina/Buenos_Aires', 'latitude': -34.6037, 'longitude': -58.3816},
        ]
        
        for city_data in cities_data:
            city, created = City.objects.get_or_create(
                name=city_data['name'],
                defaults=city_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created city: {city.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"City already exists: {city.name}"))
        
        self.stdout.write(self.style.SUCCESS("City seeding completed!"))
