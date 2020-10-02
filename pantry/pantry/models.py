from django.db import models
from django.urls import reverse, reverse_lazy
from django.utils.text import slugify


# Create your models here.


class Group(models.Model):
    DAIRY = 'Dairy'
    MEAT = 'Meat'
    FRUIT_VEGETABLE = 'FV'
    GRAIN = 'Grain'
    GROUP_CHOICES = [
        (DAIRY, 'Dairy'),
        (MEAT, 'Meat'),
        (FRUIT_VEGETABLE, 'FV'),
        (GRAIN, 'Grain'),
    ]
    name = models.CharField(
        max_length=10, choices=GROUP_CHOICES, default=DAIRY)

    def __str__(self):
        return self.name


class Storage(models.Model):
    REFRIGERATOR = 'Refrigerator'
    FREEZER = 'Freezer'
    PANTRY = 'Pantry'
    STORAGE_CHOICES = [
        (REFRIGERATOR, 'Refrigerator'),
        (FREEZER, 'Freezer'),
        (PANTRY, 'Pantry'),
    ]

    name = models.CharField(
        max_length=12, choices=STORAGE_CHOICES, default=REFRIGERATOR)

    def slug(self):
        return slugify(self.name)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse_lazy('storage_list', args=[str(self.id)])


class Item(models.Model):
    name = models.CharField(max_length=25)
    quantity = models.IntegerField()
    weight = models.IntegerField(blank=True, null=True, default=None)
    purchase_date = models.DateField(auto_now_add=False)
    expiry_date = models.DateField(blank=True, null=True, auto_now_add=False)
    price = models.FloatField(blank=True, null=True, default=None)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    # def __getattr__(self, name):
    #     return getattr(self.storage, name, None)

    def get_absolute_url(self):
        return reverse_lazy('item_list', args=[str(self.id)])
