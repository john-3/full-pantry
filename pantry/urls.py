from django.urls import path

from .views import StorageListView, ItemListView, ItemCreateView, ItemDetailView, ItemDeleteView

urlpatterns = [
    path('new/', ItemCreateView.as_view(), name='item_add'),
    path('<slug:slug>/<int:pk>/', ItemDetailView.as_view(), name='item_detail'),
    path('<slug:slug>/<int:pk>/remove/',
         ItemDeleteView.as_view(), name='item_delete'),
    path('<slug:slug>/', ItemListView.as_view(), name='item_list'),
    path('', StorageListView.as_view(), name='storage_list'),
]
