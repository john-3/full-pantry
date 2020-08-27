from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView

# Create your views here.

from .models import Storage, Item, Group


class StorageListView(ListView):
    model = Storage
    template_name = 'storage_list.html'
    context_object_name = 'all_storage_list'


class ItemListView(ListView):
    model = Item
    template_name = 'item_list.html'
    context_object_name = 'all_item_list'


class ItemCreateView(CreateView):
    model = Item
    template_name = 'item_add.html'
    fields = ('name', 'quantity', 'weight',
              'purchase_date', 'price', 'group', 'storage',)
