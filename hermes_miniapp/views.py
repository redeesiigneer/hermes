from django.shortcuts import render
from .models import Product

def index(request):
    products = Product.objects.filter(is_active=True)[:8]  # 8 активных продуктов
    return render(request, 'shop/index.html', {'products': products})