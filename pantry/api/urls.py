from django.urls import path
from .views import ItemAPIView, StorageAPIView, ItemDetail

urlpatterns = [
    path('items/', ItemAPIView.as_view()),
    path('items/<int:pk>/', ItemDetail.as_view()),
    path('storage/', StorageAPIView.as_view()),
]
