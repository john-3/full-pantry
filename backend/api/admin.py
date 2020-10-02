from django.contrib import admin
import datetime

# Register your models here.

from .models import Storage, Item


class StorageAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'get_storage',
                    'expiry', 'expires_in', )
    list_editable = ('expiry',)
    list_filter = ('storage',)

    def expires_in(self, obj):
        if obj.expiry:
            return obj.expiry - datetime.date.today()
    expires_in.admin_order_field = 'expiry'

    def get_storage(self, obj):
        return obj.storage.name
    get_storage.admin_order_field = 'storage'
    get_storage.short_description = 'Storage'

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ("expiry", )
        form = super(ItemAdmin, self).get_form(request, obj, **kwargs)
        return form


admin.site.register(Storage, StorageAdmin)
admin.site.register(Item, ItemAdmin)
