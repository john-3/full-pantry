from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, DeleteView
from django.urls import reverse, reverse_lazy

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
    # success_url = reverse_lazy('item_list', kwargs={'slug': str(
    #     getattr(Item.objects.last(), 'storage')).lower()})

    def get_success_url(self):
        return reverse('item_list', args=(str(self.object.storage).lower(),))


class ItemDetailView(DetailView):
    model = Item
    template_name = 'item_detail.html'
    success_url = reverse_lazy('storage_list')


class ItemDeleteView(DeleteView):
    model = Item
    template_name = 'item_delete.html'
    success_url = reverse_lazy('storage_list')
