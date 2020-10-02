from rest_framework import serializers
from .models import Item, Storage


class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ('id', 'name',)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'quantity', 'expiry', 'storage',)
