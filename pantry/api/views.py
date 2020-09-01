from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from pantry.models import Item, Storage
from .serializers import ItemSerializer, StorageSerializer


class ItemAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class StorageAPIView(generics.ListAPIView):
    queryset = Storage.objects.all()
    serializer_class = StorageSerializer


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
