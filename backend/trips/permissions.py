from rest_framework.permissions import BasePermission


class IsTripOwner(BasePermission):
    """Allow access only to the owner of the trip or object related to trip."""

    def has_object_permission(self, request, view, obj):
        # obj can be Trip, TripStop, PackingItem, TripNote, or BudgetEntry
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        if hasattr(obj, 'trip'):
            return obj.trip.owner == request.user
        if hasattr(obj, 'trip_stop'):
            return obj.trip_stop.trip.owner == request.user
        return False
