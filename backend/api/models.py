from django.db import models
import datetime

# Create your models here.


class Storage(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=50)
    quantity = models.PositiveSmallIntegerField()
    # expires_in = models.IntegerField()
    expiry = models.DateField(blank=True, null=True,
                              #   default=datetime.date.today() + datetime.timedelta(days=4)
                              )
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
