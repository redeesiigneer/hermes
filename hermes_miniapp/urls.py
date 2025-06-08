from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('my.html', views.index, name='my'),
    path('cart.html', views.index, name='cart'),
    # другие маршруты
]