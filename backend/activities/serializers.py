from rest_framework import serializers
from .models import TripActivity


class TripActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = TripActivity
        fields = ('id', 'trip_stop', 'title', 'category', 'description', 'date', 'start_time', 'end_time', 'cost', 'currency', 'is_completed', 'position')
        read_only_fields = ('id',)

    def validate(self, attrs):
        trip_stop = attrs.get('trip_stop') or self.context.get('trip_stop')
        date = attrs.get('date')
        cost = attrs.get('cost')

        if date and trip_stop and (date < trip_stop.start_date or date > trip_stop.end_date):
            raise serializers.ValidationError({'date': 'Activity date must be within stop date range.'})
        if cost is not None and cost < 0:
            raise serializers.ValidationError({'cost': 'Cost must be 0 or greater.'})

        return attrs
