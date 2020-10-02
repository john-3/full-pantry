from django.urls import path

from .views import ListItem, ListStorage, DetailItem

urlpatterns = [
    path('items/', ListItem.as_view()),
    path('items/<int:pk>/', DetailItem.as_view()),
    path('storages/', ListStorage.as_view()),

]
