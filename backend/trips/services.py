from django.db import transaction
from .models import TripStop
from budget.models import BudgetEntry


def normalize_stop_positions(trip):
    """Ensure stop positions for a trip are dense 0..N-1.

    Call after any insert/delete/reorder operation.
    """
    stops = list(trip.stops.order_by('position', 'created_at').all())
    with transaction.atomic():
        for idx, stop in enumerate(stops):
            if stop.position != idx:
                stop.position = idx
                stop.save(update_fields=['position'])


def aggregate_budget(trip):
    """Return aggregated budget summary for a trip.

    Returns a dict: { 'planned': Decimal, 'actual': Decimal, 'by_category': {...} }
    """
    entries = BudgetEntry.objects.filter(trip=trip)
    planned = entries.filter(entry_type='PLANNED').aggregate_total('amount') if hasattr(entries, 'aggregate_total') else None
    # Simple aggregation using Django ORM
    from django.db.models import Sum
    planned_sum = entries.filter(entry_type='PLANNED').aggregate(sum=Sum('amount'))['sum'] or 0
    actual_sum = entries.filter(entry_type='ACTUAL').aggregate(sum=Sum('amount'))['sum'] or 0
    by_category = entries.values('category').annotate(total=Sum('amount'))
    return {'planned': planned_sum, 'actual': actual_sum, 'by_category': list(by_category)}
