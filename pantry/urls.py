from django.urls import path

from .views import StorageListView, ItemListView, ItemCreateView, ItemDeleteView

urlpatterns = [
    path('new/', ItemCreateView.as_view(), name='item_add'),
    path('remove/', ItemDeleteView.as_view(), name='item_delete'),
    path('<slug:slug>/', ItemListView.as_view(), name='item_list'),
    path('', StorageListView.as_view(), name='storage_list'),
]
