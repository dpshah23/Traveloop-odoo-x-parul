from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction

from .models import Trip, TripStop, PackingItem, TripNote
from activities.models import TripActivity
from budget.models import BudgetEntry
from core.constants import TRIP_STATUS_CHOICES
from .services import normalize_stop_positions

User = get_user_model()


class TripStopSerializer(serializers.ModelSerializer):
    activities = TripActivitySerializer(many=True, read_only=True)

    class Meta:
        model = TripStop
        fields = ('id', 'trip', 'city', 'position', 'start_date', 'end_date', 'stop_notes', 'daily_budget', 'activities')
        read_only_fields = ('id', 'trip')

    def validate(self, attrs):
        trip = self.context.get('trip') or (attrs.get('trip') if attrs.get('trip') else None)
        if trip is None and 'trip' not in attrs:
            raise serializers.ValidationError('Trip must be provided.')

        start = attrs.get('start_date')
        end = attrs.get('end_date')
        if start and end and end < start:
            raise serializers.ValidationError({'end_date': 'Stop end_date must be >= start_date.'})

        if trip and start and end:
            if start < trip.start_date or end > trip.end_date:
                raise serializers.ValidationError('Stop dates must be within trip date range.')

        return attrs


class PackingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingItem
        fields = ('id', 'trip', 'trip_stop', 'name', 'category', 'quantity', 'is_packed', 'is_essential', 'notes', 'position')
        read_only_fields = ('id', 'trip')


class TripNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripNote
        fields = ('id', 'trip', 'trip_stop', 'title', 'content', 'is_public', 'created_by', 'created_at')
        read_only_fields = ('id', 'created_by', 'created_at')


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


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = ('id', 'trip', 'trip_stop', 'category', 'label', 'amount', 'entry_type', 'created_at')
        read_only_fields = ('id', 'created_at')


class TripListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'owner', 'title', 'start_date', 'end_date', 'status', 'is_public', 'share_slug', 'total_budget', 'currency')
        read_only_fields = ('id', 'owner', 'share_slug')


class TripDetailSerializer(serializers.ModelSerializer):
    stops = TripStopSerializer(many=True, read_only=True)
    packing_items = PackingItemSerializer(many=True, read_only=True)
    notes = TripNoteSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = ('id', 'owner', 'title', 'description', 'cover_image', 'start_date', 'end_date', 'status', 'is_public', 'share_slug', 'total_budget', 'currency', 'stops', 'packing_items', 'notes')
        read_only_fields = ('id', 'owner', 'share_slug')

    def validate(self, attrs):
        start = attrs.get('start_date', getattr(self.instance, 'start_date', None))
        end = attrs.get('end_date', getattr(self.instance, 'end_date', None))
        if start and end and end < start:
            raise serializers.ValidationError({'end_date': 'Trip end_date must be >= start_date.'})
        return attrs

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request else None
        with transaction.atomic():
            trip = Trip.objects.create(owner=user, **validated_data)
        return trip
