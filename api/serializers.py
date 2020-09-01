from django.db import models
from rest_framework import serializers
from pantry.models import Item, Storage

# Create your models here.


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'quantity', 'price',
                  'purchase_date', 'group', 'storage',)


class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ('id', 'name',)
