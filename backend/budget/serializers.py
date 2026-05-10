from rest_framework import serializers
from .models import BudgetEntry


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = ('id', 'trip', 'trip_stop', 'category', 'label', 'amount', 'entry_type', 'created_at')
        read_only_fields = ('id', 'created_at')
