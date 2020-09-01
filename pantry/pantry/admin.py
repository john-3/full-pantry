from django.contrib import admin

# Register your models here.

from .models import Item, Group, Storage


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'group', 'storage',)


class StorageAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug',)


admin.site.register(Item, ItemAdmin)
admin.site.register(Group)
admin.site.register(Storage, StorageAdmin)
