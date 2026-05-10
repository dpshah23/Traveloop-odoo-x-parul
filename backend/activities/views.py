from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TripActivity
from .serializers import TripActivitySerializer


class TripActivityViewSet(viewsets.ModelViewSet):
    queryset = TripActivity.objects.select_related('trip_stop', 'trip_stop__trip')
    serializer_class = TripActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        trip_stop_id = self.kwargs.get('stop_pk') or self.request.query_params.get('trip_stop')
        if trip_stop_id:
            qs = qs.filter(trip_stop_id=trip_stop_id)
        return qs.filter(trip_stop__trip__owner=self.request.user)
