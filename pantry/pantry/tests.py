from django.test import TestCase

# Create your tests here.

from .models import Item, Group, Storage


class ItemTests(TestCase):

    @classmethod

    def setUpTestData(cls):
        test_group = Group.objects.create(name='YES')
        test_storage = Storage.objects.create(name='GARBAGE CAN')

        test_item = Item.objects.create(
            name='Bun',
            quantity=1,
            weight=None,
            purchase_date='2020-9-1',
            price=5,
            group=test_group,
            storage=test_storage,
        )
        test_item.save()

    def test_item_content(self):
        item = Item.objects.get(id=1)
        name = f'{item.name}'
        quantity = f'{item.quantity}'
        purchase_date = f'{item.purchase_date}'
        group = f'{item.group}'
        storage = f'{item.storage}'
        self.assertEquals(name, 'Bun')
        self.assertEquals(quantity, '1')
        self.assertEquals(purchase_date, '2020-09-01')
        self.assertEquals(group, 'YES')
        self.assertEquals(storage, 'GARBAGE CAN')