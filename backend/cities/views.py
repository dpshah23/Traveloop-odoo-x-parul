from rest_framework import viewsets, filters

from .models import City
from .serializers import CitySerializer


class CityViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = City.objects.all().order_by('name')
	serializer_class = CitySerializer
	filter_backends = [filters.SearchFilter, filters.OrderingFilter]
	search_fields = ['name', 'country', 'country_code']
	ordering_fields = ['name', 'country']
