from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Trip, TripStop, PackingItem, TripNote
from budget.models import BudgetEntry
from .serializers import (
    TripListSerializer, TripDetailSerializer, TripStopSerializer, BudgetEntrySerializer
)
from .permissions import IsTripOwner
from .services import normalize_stop_positions, aggregate_budget


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    permission_classes = [IsAuthenticated, IsTripOwner]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['start_date', 'end_date', 'created_at']

    def get_serializer_class(self):
        if self.action in ('list',):
            return TripListSerializer
        return TripDetailSerializer

    def get_queryset(self):
        # owner-only listing
        return Trip.objects.filter(owner=self.request.user).select_related('owner').prefetch_related('stops', 'packing_items')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsTripOwner])
    def budget(self, request, pk=None):
        trip = self.get_object()
        summary = aggregate_budget(trip)
        return Response(summary)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsTripOwner])
    def normalize_stops(self, request, pk=None):
        trip = self.get_object()
        normalize_stop_positions(trip)
        return Response({'detail': 'Positions normalized.'})


class TripStopViewSet(viewsets.ModelViewSet):
    serializer_class = TripStopSerializer
    permission_classes = [IsAuthenticated, IsTripOwner]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        trip_id = self.kwargs.get('trip_pk')
        if trip_id:
            context['trip'] = get_object_or_404(Trip, pk=trip_id, owner=self.request.user)
        return context

    def get_queryset(self):
        # optionally filter by trip id
        trip_id = self.kwargs.get('trip_pk') or self.request.query_params.get('trip')
        qs = TripStop.objects.all().select_related('city', 'trip')
        if trip_id:
            qs = qs.filter(trip_id=trip_id)
        # restrict to owner's trips
        return qs.filter(trip__owner=self.request.user)

    def perform_create(self, serializer):
        trip_id = self.kwargs.get('trip_pk') or self.request.data.get('trip')
        trip = get_object_or_404(Trip, pk=trip_id, owner=self.request.user)
        serializer.save(trip=trip)
        normalize_stop_positions(trip)


class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetEntrySerializer
    permission_classes = [IsAuthenticated, IsTripOwner]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        trip_id = self.kwargs.get('trip_pk')
        if trip_id:
            context['trip'] = get_object_or_404(Trip, pk=trip_id, owner=self.request.user)
        return context

    def get_queryset(self):
        trip_id = self.kwargs.get('trip_pk') or self.request.query_params.get('trip')
        qs = BudgetEntry.objects.select_related('trip', 'trip_stop')
        if trip_id:
            qs = qs.filter(trip_id=trip_id)
        return qs.filter(trip__owner=self.request.user)

    def perform_create(self, serializer):
        trip_id = self.kwargs.get('trip_pk') or self.request.data.get('trip')
        trip = get_object_or_404(Trip, pk=trip_id, owner=self.request.user)
        serializer.save(trip=trip)


class PublicTripShareView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        trip = get_object_or_404(
            Trip.objects.select_related('owner').prefetch_related('stops', 'packing_items', 'notes'),
            share_slug=slug,
            is_public=True,
        )
        return Response(TripDetailSerializer(trip, context={'request': request}).data)
from django.shortcuts import render

# Create your views here.
