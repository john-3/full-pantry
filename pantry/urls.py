from django.urls import path

from .views import StorageListView, ItemListView, ItemCreateView

urlpatterns = [
    path('new/', ItemCreateView.as_view(), name='item_add'),
    path('<slug:slug>/', ItemListView.as_view(), name='item_list'),
    path('', StorageListView.as_view(), name='storage_list'),
]
